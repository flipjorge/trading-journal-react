import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Portfolio } from "../models/portfolioModels";
import { dummyPortfolioData } from "../data/dummyPortfolioData";

const portfoliosSlice = createSlice({
    name: 'portfolios',
    initialState: dummyPortfolioData,
    reducers: {
        addPortfolio: (state:Portfolio[], action:PayloadAction<Portfolio>) => {
            state.push(action.payload);
        },
        updatePortfolio: (state:Portfolio[], action:PayloadAction<Portfolio>) => {
            const index = state.findIndex(portfolio => portfolio.id === action.payload.id);
            if(index != -1) {
                state[index] = action.payload;
            }
        },
        removePortfolio: (state:Portfolio[], action:PayloadAction<string>) => {
            const index = state.findIndex(portfolio => portfolio.id === action.payload);
            if(index != -1) {
                state.splice(index, 1);
            }
        }
    }
})

export const { addPortfolio, updatePortfolio, removePortfolio } = portfoliosSlice.actions;
export default portfoliosSlice.reducer;