import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import axios from "axios";

import authRouter from "./routes/authRouter.js";
import checkAuth from "./middleware/checkAuth.js";
import TelegramBot from "node-telegram-bot-api";

const token = "5756023407:AAFZegnQT-KKXrvNkU39ZtR37vmPJgWLEkA";

const bot = new TelegramBot(token, { polling: true });

mongoose
  .connect("mongodb://localhost:27017/auth")
  .then(() => {
    console.log("DB - Power");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("/uploads"));

app.use("/auth", authRouter);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

//Запрашиваем все команды
const getCommands = () => {
  return axios
    .get(`https://api.telegram.org/bot${token}/getMyCommands`)
    .then((response) => {
      return response.data.result;
    })
    .catch((err) => {
      console.log(err);
    });
};
//Отвечаем на них, если они есть в сообщении
bot.on("message", (msg) => {
  getCommands().then((data) => {
    data?.map((obj) => {
      if (msg.text === "/" + obj.command) {
        bot.sendMessage(msg.chat.id, obj.description);
      }
    });
  });
});

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server - Power");
});
