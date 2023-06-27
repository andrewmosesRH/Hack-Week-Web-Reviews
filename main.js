const requestMailosaur = require('./requestMailosaur');
const requestLucius = require('./requestLucius');
const sendSlackMessage = require('./sendSlackMessage');

async function main() {
  const mailosaurResponse = await requestMailosaur();

  const { contents, reviewsProcessed, reviewsRemaining } = mailosaurResponse;

  if (reviewsProcessed === 0) {
    // Don't need to send requests for no reason
    console.log('[STATUS]::: process ended early - no reviews processed');
    return;
  } else {
    const luciusResponse = await requestLucius(contents);

    const feedback = luciusResponse[0].message.content;

    sendSlackMessage(
      feedback,
      String(reviewsProcessed),
      String(reviewsRemaining)
    );
  }
}

main();
