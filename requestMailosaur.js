require('dotenv').config();
const MailosaurClient = require('mailosaur');
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

async function requestMailosaur() {
  console.log('[STATUS]::: requestMailosaur is starting its task');
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
  let reviewsProcessed = 0;
  const contents = [];

  let index = 1;

  while (tokenCount <= 800) {
    try {
      const email = await mailosaur.messages.get(server, criteria, options);
      const { text, id } = email;
      const tokens = text.body.length;

      if (tokens + tokenCount <= 800) {
        contents.push(text.body);
        tokenCount += tokens;
        reviewsProcessed++;

        await mailosaur.messages.del(id);

        console.log(`[STATUS]::: Reviews added for processing: ${index}`);
        index++;
      } else {
        console.log('[STATUS]::: Token threshold at max');
        break;
      }
    } catch (error) {
      const noMessages = error
        .toString()
        .startsWith('Error: No matching messages');

      if (noMessages) {
        console.log('[STATUS]::: No remaining messages');
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

  const reviewsList = await mailosaur.messages.list(server);
  const reviewsRemaining = reviewsList?.length ?? 0;

  if (contents.length === 0) contents.push('No submissions');

  console.log('[STATUS]::: requestMailousar completed its task');

  return {
    contents,
    reviewsProcessed: reviewsProcessed,
    reviewsRemaining: reviewsRemaining,
  };
}

module.exports = requestMailosaur;
