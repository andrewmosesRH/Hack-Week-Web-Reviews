const axios = require('axios');
require('dotenv').config();

async function sendSlackMessage(text, processed, remaining) {
  console.log(':::[STATUS]::: sendSlackMessage is starting its task\n');

  const title = 'New feedback incoming! :praise-the-sun:\n\n';
  const variables = {
    text,
    title,
    processed,
    remaining,
  };

  try {
    const url = process.env.SLACK_URL;
    await axios.post(url, variables);

    console.log(':::[STATUS]::: sendSlackMessage completed its task\n');
  } catch (error) {
    console.error(':::[STATUS]::: Error in sendSlackMessage\n', error);
  }
}

module.exports = sendSlackMessage;
