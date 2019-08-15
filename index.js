const { TelegramBot, TelegramHandler } = require('bottender');
const { createServer } = require('bottender/koa');
const NodeCache = require('node-cache')
const util = require('./util');
const FAQ = require('./FAQ.json');

const bot = new TelegramBot({
  accessToken: process.env.ACCESS_TOKEN,
});

const cache = new NodeCache({
  stdTTL: 600
})

const handler = new TelegramHandler()
  .onText('/start', async context => {
    let keys = Object.keys(FAQ[0]['FAQ']);
    let keyboard = [['/start'], ['/last_step']];
    for (var i in keys)
      keyboard.push([keys[i]]);

    const options = {
      reply_markup: {
        'keyboard': keyboard
      } 
    };

    let reply = "FAQ:\n";
    for (var i = 0; i < keys.length; i++)
      reply = reply.concat("\n" + (i+1) + ". " + keys[i].toString());

    let history = cache.get(context._session.user.id);
    if (history == undefined)
      history = [];

    history.push('/start');
    cache.set(context._session.user.id, history);

    await context.sendMessage(reply, options);
  })

  .onText('/last_step', async context => {
    let keys = Object.keys(FAQ[0]['FAQ']);
    let text = 'FAQ';

    let history = cache.get(context._session.user.id);
    if (history != undefined) {
      history.pop();
      text = history[history.length - 1];
      cache.set(context._session.user.id, history);
    }

    console.log("------" + cache.get(context._session.user.id));


    let contents = util.findValue(FAQ, text);
    let message = contents.toString();
    
    if (Object.keys(contents).length > 0)
      keys = Object.keys(contents[0]);
    
    let keyboard = [['/start'], ['/last_step']];
    for (var i in keys)
      keyboard.push([keys[i]]);

    const options = {
      reply_markup: {
        'keyboard': keyboard
      }
    };
    
    if (keys[0] != 0) {
      let reply = "FAQ:\n";
      for (var i = 0; i < keys.length; i++)
        reply = reply.concat("\n" + (i+1) + ". " + keys[i].toString());

      await context.sendMessage(reply, options);
    }
    else await context.sendMessage(message);
  })

  .onEvent(async context => {
    let keys = Object.keys(FAQ[0]['FAQ']);
    let { text } = context.event;
    if ('0123456789'.indexOf(text) !== -1)
      text = "";
    let contents = util.findValue(FAQ, text);
    let message = contents.toString();
    
    if (Object.keys(contents).length > 0)
      keys = Object.keys(contents[0]);
    
    let keyboard = [['/start'], ['/last_step']];
    for (var i in keys)
      keyboard.push([keys[i]]);

    const options = {
      reply_markup: {
        'keyboard': keyboard
      }
    };

    let history = cache.get(context._session.user.id);
    if (history == undefined)
      history = [];

    history.push(text);
    cache.set(context._session.user.id, history);

    console.log(cache.get(context._session.user.id));

    if (keys[0] != 0) {
      let reply = "FAQ:\n";
      for (var i = 0; i < keys.length; i++)
        reply = reply.concat("\n" + (i+1) + ". " + keys[i].toString());

      await context.sendMessage(reply, options);
    }
    else await context.sendMessage(message);
  });



bot.onEvent(handler);

const server = createServer(bot);

server.listen(process.env.PORT,process.env.IP, () => {
  console.log('Your code is running at heroku.');
});