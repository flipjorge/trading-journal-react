import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store";
import { Trade, TradeTransaction } from "../models/tradeModels";
import { useMemo } from "react";
import { addTrade, removeTrade, updateTrade } from "../slices/tradesSlice";
import { useGetTransactionsByTradeId } from "./transactionHooks";

export const useGetAllTrades = () => {
    return useSelector((state:RootState) => state.trades);
}

export const useGetTradesBySymbol = (symbol:string) => {
    const trades = useGetAllTrades();
    return useMemo(() =>
        trades.filter(trade => trade.symbol === symbol)
    ,[trades, symbol]);
}

export const useTradeFirstDate = (trade:Trade) => {
    const transactions = useGetTransactionsByTradeId(trade.id);
    return useMemo(() => {
        if(!transactions || transactions.length === 0) return '-';
        return new Date(transactions[0].datetime).toLocaleDateString();
    }, [transactions]);
}

export const useTradeEntryPrice = (trade:Trade) => {
    const transactions = useGetTransactionsByTradeId(trade.id);
    return useMemo(() => {
        return transactions[0]?.price || '-';
    }, [transactions]);
}

export const useTradeTotalQuantity = (trade:Trade) => {
    const transactions = useGetTransactionsByTradeId(trade.id);
    return useMemo(() => {
        return transactions.reduce((total:number, transaction:TradeTransaction) => {
            if(transaction.action === 'buy') return total + transaction.quantity;
            return total - transaction.quantity;
        }, 0);
    }, [transactions]);
}

export const useTradeEntryTotal = (trade:Trade) => {
    const transactions = useGetTransactionsByTradeId(trade.id);
    return useMemo(() => {
        if(!transactions || transactions.length === 0) return '-';
        return transactions[0].price * transactions[0].quantity;
    }, [transactions]);
}

export const useAddTrade = () => {
    const dispatch = useDispatch();

    return (trade:Trade) => dispatch(addTrade(trade));
}

export const useEditTrade = () => {
    const dispatch = useDispatch();

    return (trade:Trade) => dispatch(updateTrade(trade));
}

export const useDeleteTrade = () => {
    const dispatch = useDispatch();

    return (trade:Trade) => dispatch(removeTrade(trade.id));
}