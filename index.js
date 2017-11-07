require('dotenv').config();
const debug = require('debug')('your-bot:index');

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

const bot_token = process.env.SLACK_TOKEN;
console.log('bot_token', bot_token);

if (!bot_token) {
  console.error('invalid bot_token');
  process.exit();
}

const rtm = new RtmClient(bot_token);

let channels = {};
let me;
let channel;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  me = rtmStartData.self.id;
  for (const c of rtmStartData.channels) {
    if (c.is_member && c.name ==='xtest') { channel = c.id }
    channels[c.name] = c.id;
  }
  debug(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
  debug('My Id:', me);
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  //rtm.sendMessage("Hello!", channel);
});

rtm.on(RTM_EVENTS.MESSAGE, (data) => {
  /* sample:
   * { type: 'message',
   *   channel: 'C0RTVMXMF',
   *   user: 'U02DLNLL6',
   *   text: '<@U7VCSCGC8> test',
   *   ts: '1510042862.000243',
   *   source_team: 'T02DLNLL2',
   *   team: 'T02DLNLL2' }
   *
  */
  // write something here
  //
  debug('Message incoming', data);

  if (data.text.match(/ほげ/)) {
    test();
  }
});

rtm.start();
