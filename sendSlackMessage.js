const axios = require('axios');
require('dotenv').config();

async function sendSlackMessage(text) {
  const title = 'New feedback incoming! :praise-the-sun:\n\n';
  const variables = {
    text,
    title,
  };

  try {
    await axios.post(process.env.SLACK_URL, variables);
  } catch (error) {
    console.error('Error in sendSlackMessage', error);
  }
}

module.exports = sendSlackMessage;
