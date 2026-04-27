import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ShopFree Backend is running' });
});

/**
 * Main recommendation endpoint
 * 1. Generates a search query using Gemini
 * 2. Searches the web for products
 * 3. Scrapes data (simplified for now)
 * 4. Ranks products using Gemini
 */
app.post('/api/recommend-product', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received inquiry:', formData);

    if (!formData || !formData.category) {
      return res.status(400).json({ error: 'Invalid form data' });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY");
      return res.status(500).json({ error: 'Server configuration error: Missing Gemini API Key' });
    }

    // STEP 1: Generate Search Query
    const queryPrompt = `
      You are an expert shopping assistant. Given the following user profile, generate a single, highly optimized Google Search query to find real product reviews and listings that match their needs perfectly.
      
      User Profile:
      - Category: ${formData.category}
      - Age: ${formData.age}
      - Location: ${formData.city}
      - Climate: ${formData.climate}
      - Needs: ${Object.values(formData.additionalInfo || {}).join(', ')}
      
      Return ONLY the search query string.
    `;
    
    const queryResult = await model.generateContent(queryPrompt);
    const searchQuery = queryResult.response.text().trim().replace(/"/g, '');
    console.log('Generated Search Query:', searchQuery);

    // STEP 2: Web Search (Using Serper.dev as primary)
    let searchResults = [];
    if (process.env.SERPER_API_KEY) {
      console.log('Searching Serper for:', searchQuery);
      const serperRes = await axios.post('https://google.serper.dev/search', {
        q: searchQuery,
        num: 10
      }, {
        headers: { 
          'X-API-KEY': process.env.SERPER_API_KEY,
          'Content-Type': 'application/json'
        }
      });
      searchResults = serperRes.data.organic || [];
      console.log(`Found ${searchResults.length} search results.`);
    } else {
      console.warn('SERPER_API_KEY not found. Falling back to empty results.');
    }

    // STEP 3: Scrape & Evidence Collection (Stub for now)
    const productEvidence = searchResults.map(result => ({
      title: result.title,
      snippet: result.snippet,
      link: result.link
    }));


    // STEP 4: Rank with Gemini
    const rankPrompt = `
      You are BestFit AI. Analyze the following product search results for a user and pick the single best match and 2 alternatives.
      
      User Profile:
      - Category: ${formData.category}
      - Age: ${formData.age}
      - Location: ${formData.city}
      - Climate: ${formData.climate}
      
      Search Results:
      ${JSON.stringify(productEvidence, null, 2)}
      
      Return a VALID JSON object matching this schema exactly:
      {
        "bestMatch": {
          "name": "string",
          "brand": "string",
          "matchScore": number (0-100),
          "price": "string",
          "image": "string (use a high quality unsplash URL if no real image found)",
          "aiExplanation": "string (one sentence)",
          "whyMatch": ["string", "string", "string"],
          "pros": ["string", "string", "string"],
          "cautions": ["string", "string"],
          "reviewSummary": {
            "sentiment": "Positive/Mixed",
            "bestFor": "string",
            "praise": "string",
            "complaints": "string"
          },
          "link": "string"
        },
        "alternatives": [
          { "name": "string", "brand": "string", "matchScore": number, "price": "string", "image": "string", "aiExplanation": "string", "link": "string" },
          { "name": "string", "brand": "string", "matchScore": number, "price": "string", "image": "string", "aiExplanation": "string", "link": "string" }
        ]
      }
    `;

    const rankResult = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: rankPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
    
    const rawText = rankResult.response.text();
    const recommendation = JSON.parse(rawText);

    res.json({ recommendation });

  } catch (error) {
    console.error('Error in recommendation pipeline:', error);
    res.status(500).json({ error: 'Failed to process recommendation', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 BestFit AI Backend running on http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health\n`);
});
