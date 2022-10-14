import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BOT_TOKEN = "5756023407:AAFZegnQT-KKXrvNkU39ZtR37vmPJgWLEkA";

//Информация о пользователи в чате
export const fetchMe = createAsyncThunk("fetchMe", async () => {
  const { data } = await axios.post(
    `https://api.telegram.org/bot${BOT_TOKEN}/getMe`
  );
  return data;
});

//Запрос на получение всех существующих команд в боте
export const fetchCommands = createAsyncThunk("fetchCommands", async () => {
  const { data } = await axios.get(
    `https://api.telegram.org/bot${BOT_TOKEN}/getMyCommands`
  );
  return data;
});

//Создание этих команд
export const fetchSetCommands = createAsyncThunk(
  "fetchSetCommands",
  async (params) => {
    const { data } = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`,
      params
    );
    return data;
  }
);

//Запрос на удаление команд
export const fetchDeleteCommands = createAsyncThunk(
  "fetchDeleteCommands",
  async (params) => {
    const { data } = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/deleteMyCommands`,
      params
    );
    return data;
  }
);

const initialState = {
  commands: {
    data: null,
    status: "loading",
  },
  info: {
    data: null,
    status: "loading",
  },
};

const botSlice = createSlice({
  name: "bot",
  initialState,

  extraReducers: {
    //Инфа о боте
    [fetchMe.pending]: (state) => {
      state.info.data = null;
      state.info.status = "loading";
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.info.data = action.payload;
      state.info.status = "loaded";
    },
    [fetchMe.rejected]: (state) => {
      state.info.data = null;
      state.info.status = "error";
    },

    //Команды
    [fetchCommands.pending]: (state) => {
      state.commands.data = null;
      state.commands.status = "loading";
    },
    [fetchCommands.fulfilled]: (state, action) => {
      state.commands.data = action.payload;
      state.commands.status = "loaded";
    },
    [fetchCommands.rejected]: (state) => {
      state.commands.data = null;
      state.commands.status = "error";
    },
  },
});

export const botReducer = botSlice.reducer;

export const selectBotData = (state) => state.bot.info.data;

export const selectCommands = (state) => state.bot.commands.data;
