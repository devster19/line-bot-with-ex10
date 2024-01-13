'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const config = require('./config.json');

// create LINE SDK client
// const client = new line.Client(config);

const app = express();

// webhook callback
app.post('/webhook', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }
  // handle events separately
  Promise.all(
    req.body.events.map((event) => {
      // check verify webhook event
      if (
        event.replyToken === '00000000000000000000000000000000' ||
        event.replyToken === 'ffffffffffffffffffffffffffffffff'
      ) {
        return;
      }
      // NOTE return result for EX10
      const result = handleEvent(event);
      const resp = {
        messages: result,
      };
      return res.status(200).json(resp);
    })
  )
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// simple reply function
const replyText = (token, texts) => {
  const replyMessages = texts.map((text) => {
    switch (true) {
      case text.includes('อังกฤษ'):
        return { type: 'text', text: 'พูดได้สิ สบายมาก' };
      case text.includes('สีเหลือง'):
        return { type: 'text', text: 'เยลโล่วว' };
      case text.includes('มะม่วง'):
        return { type: 'text', text: 'แมงโก้' };
      case text.includes('มีด'):
        return { type: 'text', text: 'อีโต้' };
      case text.includes('ไฟแช๊ค'):
        return { type: 'text', text: 'ซิปโป้' };
      case text.includes('ชุดชั้นใน'):
        return { type: 'text', text: 'วาโก้' };
      case text.includes('เฉี๊ยบ'):
      case text.includes('แจ๋ว'):
      case text.includes('โดดเด่น'):
        return { type: 'text', text: 'แต๊งกิ้วววว' };
      case text.includes('flex'):
      case text.includes('เฟล็ก'):
        return {
          'type': 'flex',
          'altText': 'Flex Message',
          'contents': {
            'type': 'carousel',
            'contents': [
              {
                'type': 'bubble',
                'size': 'micro',
                'hero': {
                  'type': 'image',
                  'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip10.jpg',
                  'size': 'full',
                  'aspectMode': 'cover',
                  'aspectRatio': '320:213',
                },
                'body': {
                  'type': 'box',
                  'layout': 'vertical',
                  'contents': [
                    {
                      'type': 'text',
                      'text': 'Brown Cafe',
                      'weight': 'bold',
                      'size': 'sm',
                      'wrap': true,
                    },
                    {
                      'type': 'box',
                      'layout': 'baseline',
                      'contents': [
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png',
                        },
                        {
                          'type': 'text',
                          'text': '4.0',
                          'size': 'xs',
                          'color': '#8c8c8c',
                          'margin': 'md',
                          'flex': 0,
                        },
                      ],
                    },
                    {
                      'type': 'box',
                      'layout': 'vertical',
                      'contents': [
                        {
                          'type': 'box',
                          'layout': 'baseline',
                          'spacing': 'sm',
                          'contents': [
                            {
                              'type': 'text',
                              'text': 'ใจสั่นเพราะกาแฟหรือแกฟะ',
                              'wrap': true,
                              'color': '#8c8c8c',
                              'size': 'xs',
                              'flex': 5,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  'spacing': 'sm',
                  'paddingAll': '13px',
                },
              },
              {
                'type': 'bubble',
                'size': 'micro',
                'hero': {
                  'type': 'image',
                  'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip11.jpg',
                  'size': 'full',
                  'aspectMode': 'cover',
                  'aspectRatio': '320:213',
                },
                'body': {
                  'type': 'box',
                  'layout': 'vertical',
                  'contents': [
                    {
                      'type': 'text',
                      'text': "Brow&Cony's Restaurant",
                      'weight': 'bold',
                      'size': 'sm',
                      'wrap': true,
                    },
                    {
                      'type': 'box',
                      'layout': 'baseline',
                      'contents': [
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png',
                        },
                        {
                          'type': 'text',
                          'text': '4.0',
                          'size': 'sm',
                          'color': '#8c8c8c',
                          'margin': 'md',
                          'flex': 0,
                        },
                      ],
                    },
                    {
                      'type': 'box',
                      'layout': 'vertical',
                      'contents': [
                        {
                          'type': 'box',
                          'layout': 'baseline',
                          'spacing': 'sm',
                          'contents': [
                            {
                              'type': 'text',
                              'text': 'ที่นั่งยังว่างคนข้างๆไม่มี',
                              'wrap': true,
                              'color': '#8c8c8c',
                              'size': 'xs',
                              'flex': 5,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  'spacing': 'sm',
                  'paddingAll': '13px',
                },
              },
              {
                'type': 'bubble',
                'size': 'micro',
                'hero': {
                  'type': 'image',
                  'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip12.jpg',
                  'size': 'full',
                  'aspectMode': 'cover',
                  'aspectRatio': '320:213',
                },
                'body': {
                  'type': 'box',
                  'layout': 'vertical',
                  'contents': [
                    {
                      'type': 'text',
                      'text': 'Tata',
                      'weight': 'bold',
                      'size': 'sm',
                    },
                    {
                      'type': 'box',
                      'layout': 'baseline',
                      'contents': [
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                        },
                        {
                          'type': 'icon',
                          'size': 'xs',
                          'url': 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png',
                        },
                        {
                          'type': 'text',
                          'text': '4.0',
                          'size': 'sm',
                          'color': '#8c8c8c',
                          'margin': 'md',
                          'flex': 0,
                        },
                      ],
                    },
                    {
                      'type': 'box',
                      'layout': 'vertical',
                      'contents': [
                        {
                          'type': 'box',
                          'layout': 'baseline',
                          'spacing': 'sm',
                          'contents': [
                            {
                              'type': 'text',
                              'text': 'แก้วมีหลายใบแต่หลายใจไม่เคย',
                              'wrap': true,
                              'color': '#8c8c8c',
                              'size': 'xs',
                              'flex': 5,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  'spacing': 'sm',
                  'paddingAll': '13px',
                },
              },
            ],
          },
        };
      default:
        return { type: 'text', text };
    }
  });
  // client.replyMessage(token, replyMessages);
  return replyMessages;
};

// callback function to handle a single event
function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken);
        case 'image':
          return handleImage(message, event.replyToken);
        case 'video':
          return handleVideo(message, event.replyToken);
        case 'audio':
          return handleAudio(message, event.replyToken);
        case 'location':
          return handleLocation(message, event.replyToken);
        case 'sticker':
          return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      return replyText(event.replyToken, 'Got followed event');

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      return replyText(event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString(
        'utf8'
      )}`;
      return replyText(
        event.replyToken,
        `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`
      );

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken) {
  return replyText(replyToken, message.text);
}

function handleImage(message, replyToken) {
  return replyText(replyToken, 'Got Image');
}

function handleVideo(message, replyToken) {
  return replyText(replyToken, 'Got Video');
}

function handleAudio(message, replyToken) {
  return replyText(replyToken, 'Got Audio');
}

function handleLocation(message, replyToken) {
  return replyText(replyToken, 'Got Location');
}

function handleSticker(message, replyToken) {
  return replyText(replyToken, 'Got Sticker');
}

const port = config.port;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
