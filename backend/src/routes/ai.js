const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/chat', async (req, res) => {
  const { message, profile, stage } = req.body;

  try {
    // This is where you'd call OpenRouter. 
    // For the prototype, we can return a structured "Reasoning" response.
    
    const prompt = `
      User Message: ${message}
      User Profile: ${JSON.stringify(profile)}
      Current Stage: ${stage}
      
      Act as an AI Counsellor. Provide a response that includes:
      1. Counseling advice
      2. Suggested actions (shortlist, lock, etc.)
      3. Reasoning based on profile
    `;

    // Simulated AI response for the prototype (to avoid actual API dependency during first run)
    const mockResponse = {
      content: "Based on your interest in US Computer Science programs and your budget, I've analyzed your profile. Stanford is a stretch but Georgia Tech is a great target. I recommend shortlisting them to see our detailed risk analysis.",
      strategy: "We should focus on strengthening your GRE scores to secure a spot at Georgia Tech.",
      suggestedActions: [
        { label: "Shortlist Georgia Tech", type: "shortlist" },
        { label: "View Risk Analysis", type: "risk" }
      ]
    };

    res.json(mockResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
