import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Trade } from "../models/tradeModels";

type TradeState = Trade | null;

const initialState:TradeState = null as TradeState;

const selectedTradeSlice = createSlice({
    name:'selectedTrade',
    initialState,
    reducers:{
        selectTrade: (_state:TradeState, action:PayloadAction<TradeState>) => action.payload,
        clearSelectedTrade: () => null
    }
});

export const { selectTrade, clearSelectedTrade } = selectedTradeSlice.actions;
export default selectedTradeSlice.reducer;