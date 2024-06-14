import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Portfolio } from "../models/portfolioModels";
import { dummyPortfolioData } from "../data/dummyPortfolioData";

type PortfolioState = Portfolio;

const initialState:PortfolioState = dummyPortfolioData[0] as PortfolioState;

const selectedPortfolioSlice = createSlice({
    name:'selectedPortfolio',
    initialState,
    reducers:{
        selectedPortfolio: (_state:PortfolioState, action:PayloadAction<PortfolioState>) => action.payload
    }
})

export const { selectedPortfolio } = selectedPortfolioSlice.actions;
export default selectedPortfolioSlice.reducer;