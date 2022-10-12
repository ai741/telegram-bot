import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { botReducer } from "./slices/bot";

const store = configureStore({
    reducer: {
        auth: authReducer,
        bot: botReducer
    },
})


export default store;