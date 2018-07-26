const WebSocket = require('ws');
const request = require('request');
const config = require('config');

let websocket;

let sendToSlack = (message) => {
    request({
        uri: config.get('slackWebhook'),
        method: 'POST',
        json: message
    }, (error, response, body) => {
        if (error) {
            console.log(error);
            console.log(body);
            console.log(response);
        }
    });
};

websocket = new WebSocket(config.get('pushbulletWebSocket'));
websocket.onopen = function(e) {
    sendToSlack({'text':'📣🤖️ QCLivery start!'});
};

websocket.onmessage = function(e) {
    //console.log('message');
    //console.log(e.data);

    let data = JSON.parse(e.data);
    if (data.type === 'push') {
        if (data.push) {
            if (data.push.type === 'sms_changed' && data.push.notifications) {
                let notification;
                for (let i = 0; i < data.push.notifications.length; i++) {
                    notification = data.push.notifications[i];
                    if (notification.title && notification.body) {
                        break;
                    }
                }
                let {
                    title,
                    body
                } = notification;

                let message = {
                    text: `💬 ${title}`,
                    attachments: [
                        {
                            text: `${body}`
                        }
                    ]
                };
                //console.log(message);
                sendToSlack(message);
            }
        }
        
    } else if (data.type === 'nop') {
        // TODO
    }
}

websocket.onerror = function(e) {
    console.log('error');
}

websocket.onclose = function(e) {
    console.log('close');
}
