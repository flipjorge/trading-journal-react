import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TradeTransaction } from "../models/tradeModels";
import { dummyTransactionsData } from "../data/dummyTransactionsData";

const transactionsSlice = createSlice({
    name:'transactions',
    initialState: dummyTransactionsData,
    reducers: {
        addTransaction: (state:TradeTransaction[], action:PayloadAction<TradeTransaction>) => {
            state.push(action.payload);
        },
        updateTransaction: (state:TradeTransaction[], action:PayloadAction<TradeTransaction>) => {
            const index = state.findIndex(transaction => transaction.id === action.payload.id);
            if(index !== -1) {
                state[index] = action.payload;
            }
        },
        removeTransaction: (state:TradeTransaction[], action:PayloadAction<string>) => {
            const index = state.findIndex(transaction => transaction.id === action.payload);
            if(index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

export const { addTransaction, updateTransaction, removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;