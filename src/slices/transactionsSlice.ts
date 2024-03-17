import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../models/tradeModels";
import { dummyTransactionsData } from "../data/dummyTransactionsData";

const transactionsSlice = createSlice({
    name:'transactions',
    initialState: dummyTransactionsData,
    reducers: {
        addTransaction: (state:Transaction[], action:PayloadAction<Transaction>) => {
            state.push(action.payload);
        },
        addTransactions: (state:Transaction[], action:PayloadAction<Transaction[]>) => {
            state.push(...action.payload);
        },
        updateTransaction: (state:Transaction[], action:PayloadAction<Transaction>) => {
            const index = state.findIndex(transaction => transaction.id === action.payload.id);
            if(index !== -1) {
                state[index] = action.payload;
            }
        },
        updateTransactions: (state:Transaction[], action:PayloadAction<Transaction[]>) => {
            action.payload.forEach(actionTransaction => {
                const index = state.findIndex(stateTransaction => stateTransaction.id === actionTransaction.id);
                if(index !== -1) {
                    state[index] = actionTransaction;
                }
            });
        },
        setTransactionsForTrade: (state:Transaction[], action:PayloadAction<{tradeId:string, transactions:Transaction[]}>) => {
            
            const tradeTransactions = state.filter(stateTransaction => stateTransaction.tradeId === action.payload.tradeId);

            //delete from state transactions not presented in action payload
            tradeTransactions.forEach(tradeTransaction => {
                const found = action.payload.transactions.find(actionTransaction => actionTransaction.id === tradeTransaction.id);
                if(!found) {
                    const index = state.findIndex(stateTransaction => stateTransaction.id === tradeTransaction.id);    
                    if(index !== -1) {
                        state.splice(index);
                    }
                }
            });

            action.payload.transactions.forEach(actionTransaction => {
                const index = state.findIndex(stateTransaction => stateTransaction.id === actionTransaction.id);
                if(index !== -1) {
                    //update transaction
                    state[index] = actionTransaction;
                } else {
                    //add transaction if its new
                    state.push(actionTransaction);
                }
            });
        },
        removeTransaction: (state:Transaction[], action:PayloadAction<string>) => {
            const index = state.findIndex(transaction => transaction.id === action.payload);
            if(index !== -1) {
                state.splice(index, 1);
            }
        },
        removeTransactionsByTradeId: (state:Transaction[], action:PayloadAction<string>) => {
            console.log(state.length);
            state.forEach(() => {
                const index = state.findIndex(transaction => transaction.tradeId === action.payload);
                if(index !== -1) {
                    state.splice(index, 1);
                }
            })
        }
    }
});

export const { addTransaction, addTransactions, updateTransaction, updateTransactions, 
    setTransactionsForTrade, removeTransaction, removeTransactionsByTradeId } = transactionsSlice.actions;
export default transactionsSlice.reducer;