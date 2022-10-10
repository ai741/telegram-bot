import TelegramBot from "node-telegram-bot-api"

const token = "5756023407:AAFZegnQT-KKXrvNkU39ZtR37vmPJgWLEkA"


const bot = new TelegramBot(token, {polling: true})


bot.on("message", msg=>{
    const text = msg.text
    const chatId = msg.chat.id

    bot.sendMessage(chatId, text)
}) 