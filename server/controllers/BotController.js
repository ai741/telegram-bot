import { botReducer } from "../../client/src/redux/slices/bot.js"
import CommandModel from "../models/Command.js"
import TelegramBot from "node-telegram-bot-api"

const token = "5756023407:AAFZegnQT-KKXrvNkU39ZtR37vmPJgWLEkA"


const bot = new TelegramBot(token, {polling: true})

export const getCommand = async  (req, res)=>{

}

export const createCommand = async  (req, res)=>{
    try {
        const doc = new CommandSchema({
            command: req.body.command,
            description: req.body.description,
        })

        const post = await doc.save()

        bot.setMyCommands()
        res.json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не фортануло"
        })
    }
}