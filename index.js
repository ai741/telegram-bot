import TelegramBot from "node-telegram-bot-api"

const token = "5756023407:AAFZegnQT-KKXrvNkU39ZtR37vmPJgWLEkA"


const bot = new TelegramBot(token, {polling: true})


bot.setMyCommands([
    {command: "/info", description: "Пук-пук"}
])

const requestKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "Сам пошел",
                one_time_keyboard: true
            }],
        ]
    }
};

bot.on("message", msg=>{
    const text = msg.text
    const chatId = msg.chat.id

    bot.sendMessage(chatId, 'Пошел нахрен', requestKeyboard);



})
