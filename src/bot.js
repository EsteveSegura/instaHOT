require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const donwload = require('./utils/downloadPicture');
const fs = require('fs')

const token = process.env.TELEGRAM_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });


bot.on('message', (msg) => {
     const chatId = msg.chat.id;
     console.log(chatId)

     if (msg.from.id != 3119961521) {
          bot.deleteMessage(msg.chat.id, msg.message_id)
     }

     //bot.sendMessage(chatId, 'Received your message');
});

function readFolder() {
     folder = []
     fs.readdirSync('./tmp').forEach(file => {
          folder.push(file)
          return file
     });
     return folder
}

setInterval(() => {
     let files = readFolder()
     if (files.length != 0) {
          let urlBase = "https://instagram.com/"
          let urlUser = files[0].split('_ig_')[0]
          if(files[0].includes('_ig_')){
               bot.sendPhoto("-1001325433576", `./tmp/${files[0]}`, { caption: `profile : ${urlBase}${urlUser}` })
          }else{
               bot.sendPhoto("-1001325433576", `./tmp/${files[0]}`)
          }
          console.log('sending pictures')
          setTimeout(() => {
               donwload.deleteImage(`./tmp/${files[0]}`)
          }, 1000);
     }
}, 60000 * 3);

