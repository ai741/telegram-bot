import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"


const BOT_TOKEN = "5756023407:AAFZegnQT-KKXrvNkU39ZtR37vmPJgWLEkA"

export const fetchMe = createAsyncThunk("fetchMe", async () =>{
    const { data } = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`)
    return data
})

export const fetchCommands = createAsyncThunk("fetchCommands", async () =>{
    const { data } = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getMyCommands`)
    return data
})

export const fetchSetCommands = createAsyncThunk("fetchSetCommands", async (params) =>{
    const { data } = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`, params)
    return data
})


const initialState = { 
    commads:{
        data: null,
        status: "loading"
    },
    info: {
        data: null,
        status: "loading"
    }

}

const botSlice = createSlice({
    name: "bot",
    initialState,

    extraReducers: {

        //Получение инфы о боте
        [fetchMe.pending] : (state) =>{
            state.info.data = null
            state.info.status = 'loading'
        },
        [fetchMe.fulfilled] : (state, action) =>{
            state.info.data = action.payload
            state.info.status = 'loaded'
        },
        [fetchMe.rejected] : (state) =>{
            state.info.data = null
            state.info.status = 'error'
        },

        //Получаем команды
        [fetchCommands.pending] : (state) =>{
            state.commads.data = null
            state.commads.status = 'loading'
        },
        [fetchCommands.fulfilled] : (state, action) =>{
            state.commads.data = action.payload
            state.commads.status = 'loaded'
        },
        [fetchCommands.rejected] : (state) =>{
            state.commads.data = null
            state.commads.status = 'error'
        },

        //Добавляем команды
    }
})


export const botReducer = botSlice.reducer

export const selectBotData = state => state.bot.info.data

export const selectCommands = state => state.bot.commads.data