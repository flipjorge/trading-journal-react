import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tradesReducer from './slices/tradesSlice';
import dialogsSlice from "./slices/dialogsSlice";
import selectedTradeSlice from "./slices/selectedTradeSlice";
import positionsSlice from "./slices/positionsSlice";
import portfoliosSlice from "./slices/portfoliosSlice";
import selectedPortfolioSlice from "./slices/selectedPortfolioSlice";

const rootReducer = combineReducers({
    portfolios:portfoliosSlice,
    trades:tradesReducer,
    positions:positionsSlice,
    dialogs:dialogsSlice,
    selectedTrade:selectedTradeSlice,
    selectedPortfolio:selectedPortfolioSlice
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;