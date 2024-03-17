import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store";
import { useMemo } from "react";
import { Transaction } from "../models/tradeModels";
import { addTransaction, updateTransaction, removeTransaction, addTransactions,
    updateTransactions, removeTransactionsByTradeId, setTransactionsForTrade } from "../slices/transactionsSlice";

export const useGetAllTransactions = () => {
    return useSelector((state:RootState) => state.transactions);
}

export const useGetTransactionsByTradeId = (tradeId:string) => {
    const transactions = useGetAllTransactions();
    return useMemo(() => {
        return transactions.filter(transaction => transaction.tradeId === tradeId);
    }, [transactions, tradeId]);
}

export const useAddTransaction = () => {
    const dispatch = useDispatch();

    return (transaction:Transaction) => dispatch(addTransaction(transaction));
}

export const useAddTransactions = () => {
    const dispatch = useDispatch();

    return (transactions:Transaction[]) => dispatch(addTransactions(transactions));
}

export const useUpdateTransaction = () => {
    const dispatch = useDispatch();

    return (transaction:Transaction) => dispatch(updateTransaction(transaction));
}

export const useUpdateTransactions = () => {
    const dispatch = useDispatch();

    return (transactions:Transaction[]) => dispatch(updateTransactions(transactions));
}

export const useSetTransactionsForTrade = () => {
    const dispatch = useDispatch();

    return (tradeId:string, transactions:Transaction[]) => 
        dispatch(setTransactionsForTrade({tradeId, transactions}));
}

export const useRemoveTransaction = () => {
    const dispatch = useDispatch();

    return (transactionId:string) => dispatch(removeTransaction(transactionId));
}

export const useRemoveTransactionsByTradeId = () => {
    const dispatch = useDispatch();

    return (tradeId:string) => dispatch(removeTransactionsByTradeId(tradeId));
}