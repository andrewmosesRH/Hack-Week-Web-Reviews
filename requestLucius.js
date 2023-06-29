const axios = require('axios');
require('dotenv').config();

async function requestLucius(reviews) {
  console.log('[STATUS]::: requestLucius starting');

  const key = process.env.LUCIUS_API_KEY;
  const endpoint = process.env.LUCIUS_ENDPOINT;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'api-key': key,
    },
  };

  const role = process.env.LUCIUS_ROLE;
  const prompt = process.env.INITIAL_PROMPT;
  const content = [`${prompt}\n`, 'Feedback:\n', ...reviews].join(' ');

  const messages = [{ role, content }];
  const max_tokens = Number(process.env.MAX_TOKENS_OUTPUT);
  const body = { messages, max_tokens };

  try {
    const response = await axios.post(endpoint, body, config);

    console.log('[STATUS]::: requestLucius completed its task');

    return response.data.choices;
  } catch (error) {
    console.error('[STATUS]::: Error in requestLucius:', error);
  }
}

module.exports = requestLucius;
