import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Trade, TradeTransaction } from '../models/Models';
import dummyData from '../data/DummyTradesData';

const tradesSlice = createSlice({
    name: 'trades',
    initialState: dummyData,
    reducers: {
        addTrade: (state:Trade[], action:PayloadAction<Trade>) => {
            state.push(action.payload);
        },
        updateTrade: (state:Trade[], action:PayloadAction<Trade>) => {
            const index = state.findIndex(trade => trade.id === action.payload.id);
            if(index !== -1){
                state[index] = action.payload;
            }
        },
        removeTrade: (state:Trade[], action:PayloadAction<number>) => {
            const index = state.findIndex(trade => trade.id === action.payload);
            state.splice(index, 1);
        },
        addTransactionToTrade: (state:Trade[], action:PayloadAction<{tradeId:number, transaction:TradeTransaction}>) => {
            const trade = state.find(trade => trade.id === action.payload.tradeId);
            if(trade) {
                trade.transactions.push(action.payload.transaction);
            }
        },
        updateTransactionOfTrade: (state:Trade[], action:PayloadAction<{tradeId:number, transaction:TradeTransaction}>) => {
            const trade = state.find(trade => trade.id === action.payload.tradeId);
            if(trade)
            {
                const index = trade.transactions.findIndex(transaction => transaction.id === action.payload.transaction.id);
                if(index !== -1) {
                    trade.transactions[index] = action.payload.transaction;
                }
            }
        },
        removeTransationFromTrade: (state:Trade[], action:PayloadAction<{tradeId:number, transactionId:number}>) => {
            const trade = state.find(trade => trade.id === action.payload.tradeId);
            if(trade)
            {
                const index = trade.transactions.findIndex(transaction => transaction.id === action.payload.transactionId);
                if(index !== -1) {
                    trade.transactions.splice(index, 1);
                }
            }
        }
    }
})

export const { addTrade, updateTrade, removeTrade, addTransactionToTrade, updateTransactionOfTrade, removeTransationFromTrade } = tradesSlice.actions;
export default tradesSlice.reducer;