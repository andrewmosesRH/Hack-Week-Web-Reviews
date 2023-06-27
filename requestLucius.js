const axios = require('axios');
require('dotenv').config();

async function requestLucius(reviews) {
  const key = process.env.LUCIUS_API_KEY;
  const endpoint = process.env.LUCIUS_ENDPOINT;
  const headers = {
    'Content-Type': 'application/json',
    'api-key': key,
  };

  const role = process.env.LUCIUS_ROLE;
  const content = [
    `${process.env.INITIAL_PROMPT}\n`,
    'Feedback:\n',
    ...reviews,
  ].join(' ');

  const body = {
    messages: [{ role, content }],
    max_tokens: Number(process.env.MAX_TOKENS),
  };

  try {
    const response = await axios.post(endpoint, body, {
      headers,
    });
    return response.data.choices;
  } catch (error) {
    console.error('Error in requestLucius:', error);
  }
}

module.exports = requestLucius;
