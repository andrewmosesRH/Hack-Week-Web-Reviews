const axios = require('axios');
require('dotenv').config();
const MailosaurClient = require('mailosaur');
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

async function requestMailosaur() {
  const server = process.env.MAILOSAUR_SERVER;
  const criteria = {
    sentTo: process.env.MAILOSAUR_EMAIL,
  };
  const ONE_WEEK = 604800000;
  const receivedAfter = new Date(Date.now() - ONE_WEEK);
  const options = {
    receivedAfter,
  };

  let tokenCount = 0;
  const contents = [];

  while (tokenCount <= 800) {
    try {
      const email = await mailosaur.messages.get(server, criteria, options);
      const { text, id } = email;
      const tokens = text.body.length;

      if (tokens + tokenCount <= 800) {
        contents.push(text.body);
        tokenCount += tokens;

        await mailosaur.messages.del(id);
      } else {
        break;
      }
    } catch (error) {
      const noMessages = error
        .toString()
        .startsWith('Error: No matching messages');

      if (noMessages) {
        break;
      } else {
        console.log('Mailosaur Error:', {
          request: { server, criteria, options },
          error: error.toString(),
        });
        break;
      }
    }
  }

  return contents;
}

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

async function main() {
  const mailosaurResponse = await requestMailosaur();

  const luciusResponse = await requestLucius(mailosaurResponse);

  const feedback = luciusResponse[0].message.content;

  sendSlackMessage(feedback);
}

main();
