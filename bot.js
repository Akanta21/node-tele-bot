const process = require('./config');

const token = process.env.telegramKey;

const Bot = require('node-telegram-bot-api');
let bot;
if(process.env.NODE_ENV === 'production') {
    bot = new Bot(token);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
    bot = new Bot(token, { polling: true });
}

bot.onText(/^\/say_hello (.+)$/, function (msg, match) {
    console.log(msg);
    const name = msg.from.first_name;
    // send message to the user who sends the message
    bot.sendMessage(msg.chat.id, 'Wazzup ' + name + '!').then(function () {
        bot.sendMessage(msg.chat.id, 'I am currently away. Let me call you in 5 mins time!')
    });

    // send a sum
    bot.onText(/^\/sum((\s+\d+)+)$/, function (msg, match) {
        var result = 0;
        match[1].trim().split(/\s+/).forEach(function (i) {
          result += (+i || 0);
        })
        bot.sendMessage(msg.chat.id, result).then(function () {
          // reply sent!
        });
    });
});
console.log('bot server started...');

module.exports = bot;