import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store";
import { useMemo } from "react";
import { TradeTransaction } from "../models/tradeModels";
import { addTransaction, updateTransaction, removeTransaction } from "../slices/transactionsSlice";

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

    return (transaction:TradeTransaction) => dispatch(addTransaction(transaction));
}

export const useUpdateTransaction = () => {
    const dispatch = useDispatch();

    return (transaction:TradeTransaction) => dispatch(updateTransaction(transaction));
}

export const useRemoveTransaction = () => {
    const dispatch = useDispatch();

    return (transactionId:string) => dispatch(removeTransaction(transactionId));
}