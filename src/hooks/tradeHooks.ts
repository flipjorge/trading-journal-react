import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store";
import { Trade } from "../models/Models";
import { useMemo } from "react";
import { addTrade, removeTrade, updateTrade } from "../slices/tradesSlice";

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
    return useMemo(() => {
        if(!trade.transactions) return '-';
        return new Date(trade.transactions[0].datetime).toLocaleDateString();
    }, [trade.transactions]);
}

export const useTradeEntryPrice = (trade:Trade) => {
    return useMemo(() => {
        return trade.transactions[0]?.price || '-';
    }, [trade.transactions]);
}

export const useTradeTotalQuantity = (trade:Trade) => {
    return useMemo(() => {
        return trade.transactions.reduce((total, transaction) => {
            if(transaction.action === 'buy') return total + transaction.quantity;
            return total - transaction.quantity;
        }, 0);
    }, [trade.transactions]);
}

export const useTradeEntryTotal = (trade:Trade) => {
    return useMemo(() => {
        if(!trade.transactions) return '-';
        return trade.transactions[0].price * trade.transactions[0].quantity;
    }, [trade.transactions]);
}

export const useGetNextTradeId = () => {
    const trades = useGetAllTrades();
    return useMemo(() => {
        return trades[trades.length-1].id + 1;
    }, [trades]);
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