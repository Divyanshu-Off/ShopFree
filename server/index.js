import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ShopFree Backend is running' });
});

app.post('/api/recommend-product', async (req, res) => {
  try {
    const formData = req.body;
    console.log('\n--- New Inquiry Received ---');
    console.log('Data:', JSON.stringify(formData, null, 2));

    if (!formData || !formData.category) {
      return res.status(400).json({ error: 'Missing product category' });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('CRITICAL: GEMINI_API_KEY is missing from .env');
      return res.status(500).json({ error: 'Server config error: Missing Gemini API Key' });
    }

    // Initialize Gemini inside the request for fresh key loading
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // STEP 1: Generate Search Query
    console.log('Step 1: Generating optimized search query...');
    const queryPrompt = `Generate a single Google search query to find the best ${formData.category} for a ${formData.age} year old in ${formData.city} (${formData.climate} climate). Focus on reviews and reliable buying guides. Return ONLY the search query text.`;
    
    const queryResult = await model.generateContent(queryPrompt);
    const searchQuery = queryResult.response.text().trim().replace(/"/g, '');
    console.log('Query Result:', searchQuery);

    // STEP 2: Web Search (Serper)
    console.log('Step 2: Searching web via Serper...');
    let searchResults = [];
    if (process.env.SERPER_API_KEY) {
      const serperData = JSON.stringify({ "q": searchQuery, "num": 8 });
      const serperConfig = {
        method: 'post',
        url: 'https://google.serper.dev/search',
        headers: { 
          'X-API-KEY': process.env.SERPER_API_KEY, 
          'Content-Type': 'application/json' 
        },
        data: serperData
      };
      const serperRes = await axios.request(serperConfig);
      searchResults = serperRes.data.organic || [];
      console.log(`Success: Found ${searchResults.length} results.`);
    } else {
      console.warn('Warning: SERPER_API_KEY missing. No web results found.');
    }

    // STEP 3: Format Evidence
    const productEvidence = searchResults.map(r => ({
      title: r.title,
      snippet: r.snippet,
      link: r.link
    }));

    // STEP 4: Rank & Analyze with Gemini
    console.log('Step 4: Analyzing results with AI...');
    const rankPrompt = `
      As BestFit AI, pick the #1 best product and 2 alternatives from these results for:
      Product: ${formData.category}, User: ${formData.age}yo in ${formData.city} (${formData.climate}).
      
      Results to analyze:
      ${JSON.stringify(productEvidence, null, 2)}
      
      Return ONLY a JSON object with this exact structure:
      {
        "bestMatch": {
          "name": "string",
          "brand": "string",
          "matchScore": number,
          "price": "string",
          "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          "aiExplanation": "string",
          "whyMatch": ["string", "string"],
          "pros": ["string"],
          "cautions": ["string"],
          "reviewSummary": { "sentiment": "Positive", "bestFor": "string", "praise": "string", "complaints": "string" },
          "link": "string"
        },
        "alternatives": [
          { "name": "string", "brand": "string", "matchScore": number, "price": "string", "image": "string", "aiExplanation": "string", "link": "string" }
        ]
      }
    `;

    const rankResult = await model.generateContent(rankPrompt);
    const rawResponse = rankResult.response.text();
    
    // Clean JSON response (sometimes Gemini adds ```json ... ```)
    const jsonString = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const recommendation = JSON.parse(jsonString);

    console.log('Analysis Complete! Sending recommendation.');
    res.json({ recommendation });

  } catch (error) {
    console.error('--- ERROR IN PIPELINE ---');
    console.error('Message:', error.message);
    if (error.response) console.error('Response:', error.response.data);
    res.status(500).json({ error: 'Failed to process recommendation', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 ShopFree Backend Live at http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health\n`);
});
