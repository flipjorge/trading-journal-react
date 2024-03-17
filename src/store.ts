import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tradesReducer from './slices/tradesSlice';
import dialogsSlice from "./slices/dialogsSlice";

const rootReducer = combineReducers({
    trades:tradesReducer,
    dialogs:dialogsSlice
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;