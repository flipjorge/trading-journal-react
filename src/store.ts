import { configureStore } from "@reduxjs/toolkit";
import tradesReducer from './slices/tradesSlice';
import dialogsSlice from "./slices/dialogsSlice";
import selectedTradeSlice from "./slices/selectedTradeSlice";
import positionsSlice from "./slices/positionsSlice";
import portfoliosSlice from "./slices/portfoliosSlice";
import selectedPortfolioSlice from "./slices/selectedPortfolioSlice";

export const store = configureStore({
    reducer: {
        portfolios:portfoliosSlice,
        trades:tradesReducer,
        positions:positionsSlice,
        dialogs:dialogsSlice,
        selectedTrade:selectedTradeSlice,
        selectedPortfolio:selectedPortfolioSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;