import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tradesReducer from './slices/tradesSlice';
import dialogsSlice from "./slices/dialogsSlice";
import selectedTradeSlice from "./slices/selectedTradeSlice";
import transactionsSlice from "./slices/transactionsSlice";

const rootReducer = combineReducers({
    trades:tradesReducer,
    transactions:transactionsSlice,
    dialogs:dialogsSlice,
    selectedTrade:selectedTradeSlice
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;