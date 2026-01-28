const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/chat', async (req, res) => {
  const { message, profile, stage, lockedUniversity } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "arcee-ai/trinity-large-preview:free",
        messages: [
          {
            role: "system",
            content: `Act as a premium AI Counsellor for higher education. 
            User Profile: ${JSON.stringify(profile || {})}
            Current Stage: ${stage || 'Initial exploration'}
            Target University (Locked): ${lockedUniversity ? JSON.stringify(lockedUniversity) : 'None selected yet'}
            
            If a university is locked, focus your advice specifically on getting into that institution.
            Analyze their fit, risks, and provide actionable milestones.
            
            Provide a sophisticated, helpful response. 
            Return your response STRICTLY in the following JSON format:
            {
              "content": "Your main advice and response to the user",
              "strategy": "A brief explanation of how this advice aligns with their profile",
              "suggestedActions": [
                { "label": "Action Text", "type": "action_type_key" }
              ]
            }`
          },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Counsellor",
          "Content-Type": "application/json"
        },
      }
    );

    const aiResponse = JSON.parse(response.data.choices[0].message.content);
    res.json(aiResponse);
  } catch (error) {
    console.error('OpenRouter Error:', error.response?.data || error.message);
    // Fallback to a polite error message if AI fails
    res.status(500).json({ 
      error: 'AI service currently recalibrating',
      content: "I'm experiencing a brief pause in my neural processing. Please try sharing your thoughts again in a moment.",
      strategy: "The AI service is temporarily unavailable.",
      suggestedActions: [{ label: "Retry", type: "retry" }]
    });
  }
});

module.exports = router;
