import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Trade } from '../models/tradeModels';
import { dummyData } from '../data/dummyTradesData2';

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
        removeTrade: (state:Trade[], action:PayloadAction<string>) => {
            const index = state.findIndex(trade => trade.id === action.payload);
            state.splice(index, 1);
        }
    }
});

export const { addTrade, updateTrade, removeTrade } = tradesSlice.actions;
export default tradesSlice.reducer;