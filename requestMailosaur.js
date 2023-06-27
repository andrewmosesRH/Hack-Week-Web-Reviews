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

  if (contents.length === 0) contents.push('No submissions');

  return contents;
}

module.exports = requestMailosaur;
