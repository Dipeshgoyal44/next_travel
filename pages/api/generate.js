const { ask } = require('../../utils/openai');

export default async function (req, res) {
  const location = req.body.location || '';
  const days = req.body.days || '';
  const travelVibe = req.body['travelVibe'] || '';
  const travelStyle = req.body['travelStyle'] || '';
  const prompt = `Generate a travel itinerary for a trip to ${location} for ${days} days, with a ${travelVibe} travel vibe and a focus on ${travelStyle}.`;
  const conversation = [{ role: "user", content: prompt}]
  

  if (!location.trim() || !days.trim() || !travelVibe.trim() || !travelStyle.trim()) {
    res.status(400).json({
      error: {
        message: "Please enter valid inputs for location, days, travel-vibe, and travel-style",
      }
    });
    return;
  }

  try {
    
    const result = await ask(conversation);
    res.status(200).json({ result: result });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      }
    });
  }
}
