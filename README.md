# QCLivery

This is a small project that forwarding SMS that my Android phone received to my iPhone in realtime. At the beginning, I tried [PushBullet](https://www.pushbullet.com/), it works but I have to open browser and check SMS by myself, then I used [IFTTT](https://ifttt.com/), it was great, I can received email when my Android phoen recieved SMS, but someday it stoped working, so I cannot recived email notfication on my iPhone anymore. That's why I want to rewite my own service to instantly forward SMS via push notifcation. 

Currently, QCLivery uses [PushBullet streaming API](https://docs.pushbullet.com/#realtime-event-stream) to receive SMS event, then use [Slack incoming webhook](https://api.slack.com/incoming-webhooks) to send message into a Slack channel, then I can have Slack installed on my iPhone, so I can have push notifcation with SMS content.

## Requirements

- PushBullet installed on phone that you want to forward SMS from.

- Slack channel that is used to receive SMS message

- `node` and `npm`

- Create config file `config/default.json`

  ```json
  {
    "slackWebhook": "https://hooks.slack.com/services/...", // Slack webhook URL
    "pushbulletWebSocket": "wss://stream.pushbullet.com/websocket/${ACCESS_TOKEN}"	// PushBullet web socket URL
  }
  ```

## Start to use

Clone code and install required packages, `$ npm install`

Then just start it, slack channel will recive a startup message. `$ node index.js` 


