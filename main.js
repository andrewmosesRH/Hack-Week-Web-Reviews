const requestMailosaur = require('./requestMailosaur');
const requestLucius = require('./requestLucius');
const sendSlackMessage = require('./sendSlackMessage');

async function main() {
  const mailosaurResponse = await requestMailosaur();

  const luciusResponse = await requestLucius(mailosaurResponse);

  const feedback = luciusResponse[0].message.content;

  sendSlackMessage(feedback);
}

main();
