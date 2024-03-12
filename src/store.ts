import { configureStore } from "@reduxjs/toolkit";
import tradesReducer from './slices/tradesSlice';

export const store = configureStore({
    reducer: {
        trades: tradesReducer
    }
});