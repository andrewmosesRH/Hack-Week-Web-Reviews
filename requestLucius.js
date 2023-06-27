const axios = require('axios');
require('dotenv').config();

async function requestLucius(reviews) {
  console.log('[STATUS]::: requestLucius starting');
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
    console.log('[STATUS]::: requestLucius completed its task');
    return response.data.choices;
  } catch (error) {
    console.error('[STATUS]::: Error in requestLucius:', error);
  }
}

module.exports = requestLucius;
