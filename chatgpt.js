const axios = require('axios');

let conversation = [];

async function generateResponse(message) {
  const apiKey = 'API-KEY';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  try {
    conversation.push({ role: 'system', content: message });
    conversation.push({ role: 'user', content: message });

    const response = await axios.post(apiUrl, {
      messages: conversation,
      max_tokens: 100,
      temperature: 0.6,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    conversation.push({ role: 'assistant', content: response.data.choices[0].text.trim() });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error.response.data);
    return 'Sorry, an error occurred.';
  }
}

module.exports = { generateResponse };
