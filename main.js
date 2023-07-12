const cron = require('node-cron');
const requestMailosaur = require('./requestMailosaur');
const requestLucius = require('./requestLucius');
const sendSlackMessage = require('./sendSlackMessage');

async function main() {
  const mailosaurResponse = await requestMailosaur();

  const { contents, reviewsProcessed, reviewsRemaining } = mailosaurResponse;

  if (reviewsProcessed === 0) {
    // Don't need to send requests for no reason
    console.log(':::[STATUS]::: process ended early - no reviews processed\n');
    return;
  }

  const luciusResponse = await requestLucius(contents);

  const feedback = luciusResponse[0].message.content;

  sendSlackMessage(
    feedback,
    String(reviewsProcessed),
    String(reviewsRemaining)
  );

  if (reviewsRemaining > 0) {
    await main();
  }
}

// cron.schedule('0 9 * * *', main);

main();
