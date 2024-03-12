import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tradesReducer from './slices/tradesSlice';

const rootReducer = combineReducers({
    trades:tradesReducer
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;