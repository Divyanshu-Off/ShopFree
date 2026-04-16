export const categories = [
  {
    id: 'shampoo',
    name: 'Shampoo',
    fields: [
      { id: 'scalpType', label: 'Scalp Type', type: 'select', options: ['Normal', 'Oily', 'Dry', 'Sensitive', 'Soft/Sensitive'] },
      { id: 'hairGoal', label: 'Main Goal', type: 'select', options: ['Dandruff Control', 'Sweat/Oil Control', 'Volumizing', 'Moisturizing', 'Gentle Cleansing'] }
    ]
  },
  {
    id: 'shoes',
    name: 'Running Shoes',
    fields: [
      { id: 'footType', label: 'Foot Type', type: 'select', options: ['Flat', 'Neutral', 'High Arch'] },
      { id: 'usage', label: 'Primary Usage', type: 'select', options: ['Road Running', 'Trail Running', 'Gym/Training', 'Daily Walk'] }
    ]
  },
  {
    id: 'laptop',
    name: 'Laptop',
    fields: [
      { id: 'performance', label: 'Performance Needs', type: 'select', options: ['Basic/Student', 'Professional/Office', 'Creative/Editing', 'Gaming'] },
      { id: 'portability', label: 'Portability Importance', type: 'select', options: ['Low', 'Medium', 'High'] }
    ]
  }
];

export const mockRecommendations = {
  shampoo: {
    bestMatch: {
      name: 'Scalp Relief Daily Cleansing Shampoo',
      brand: 'PureHarmony',
      matchScore: 98,
      price: '$18 - $22',
      image: 'https://images.unsplash.com/photo-1585232350844-1e9617621c8b?auto=format&fit=crop&q=80&w=400',
      aiExplanation: 'Based on your profile as a 15-year-old in humid Chennai with a sensitive scalp, this shampoo is ideal because it uses a pH-balanced, sulfate-free formula that removes sweat and oil without stripping your delicate scalp.',
      whyMatch: [
        'Gentle enough for teenage skin and frequent washing.',
        'Controls oil and sweat caused by humid Chennai climate.',
        'Soothes sensitive scalp with aloe and green tea extracts.'
      ],
      pros: [
        'Sulfate-free and paraben-free',
        'Hypoallergenic formula',
        'Refreshing natural scent'
      ],
      cautions: [
        'May require two washes for very oily hair',
        'Slightly higher price point than drugstore brands'
      ],
      reviewSummary: {
        sentiment: 'Overwhelmingly positive',
        bestFor: 'Daily use on sensitive skin',
        praise: 'Users love how it feels lightweight and leaves no residue.',
        complaints: 'Some users mentioned wanting a larger bottle size.'
      },
      link: 'https://example.com/pureharmony-shampoo'
    },
    alternatives: [
      {
        name: 'HydroBoost Gentle Wash',
        brand: 'AquaShield',
        matchScore: 85,
        price: '$12 - $15',
        image: 'https://images.unsplash.com/photo-1626285495532-3315c1232c7b?auto=format&fit=crop&q=80&w=400',
        aiExplanation: 'A great budget-friendly alternative that focuses on hydration, though slightly less effective at oil control for very humid environments.',
        link: 'https://example.com/aquashield'
      },
      {
        name: 'Cooling Mint Therapy',
        brand: 'BreezeBotanic',
        matchScore: 82,
        price: '$20 - $25',
        image: 'https://images.unsplash.com/photo-1535585209827-a15fefbc74a9?auto=format&fit=crop&q=80&w=400',
        aiExplanation: 'Excellent for the heat of Chennai, but the mint might be slightly tingly for extremely sensitive scalps.',
        link: 'https://example.com/breezebotanic'
      }
    ]
  }
};
