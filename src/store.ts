import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tradesReducer from './slices/tradesSlice';
import dialogsSlice from "./slices/dialogsSlice";
import selectedTradeSlice from "./slices/selectedTradeSlice";

const rootReducer = combineReducers({
    trades:tradesReducer,
    dialogs:dialogsSlice,
    selectedTrade:selectedTradeSlice
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;