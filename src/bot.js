require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
     const chatId = msg.chat.id;

     if(msg.from.id != 3119961521){
          bot.deleteMessage(msg.chat.id, msg.message_id)
     }

     //bot.sendMessage(chatId, 'Received your message');
});