import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store";
import { Trade, Position } from "../models/tradeModels";
import { useMemo } from "react";
import { addTrade, removeTrade, updateTrade } from "../slices/tradesSlice";
import { useGetPositionsByTradeId } from "./positionHooks";

export const useGetAllTrades = () => {
    return useSelector((state:RootState) => state.trades);
}

export const useGetTradesByPortfolio = (id:string) => {
    const trades = useGetAllTrades();
    return useMemo(() =>
        trades.filter(trade => trade.portfolioId === id)
    ,[trades, id]);
}

export const useGetTradesBySymbol = (symbol:string) => {
    const trades = useGetAllTrades();
    return useMemo(() =>
        trades.filter(trade => trade.symbol === symbol)
    ,[trades, symbol]);
}

export const useTradeOpenDate = (trade:Trade) => {
    const transactions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!transactions || transactions.length === 0) return null;
        return new Date(transactions[0].datetime);
    }, [transactions]);
}

export const useTradeReturn = (trade:Trade):number | null => {
    const transactions = useGetPositionsByTradeId(trade.id);

    return useMemo(() => {
        if(!transactions || transactions.length === 0) return null;

        const firstTradeAction = transactions[0].action;

        const quantity = transactions.reduce((currentQuantity, transaction) => {
            if(transaction.action === firstTradeAction){
                return currentQuantity + transaction.quantity;
            }

            return currentQuantity - transaction.quantity;
        }, 0);

        if(quantity > 0) return null;

        return transactions.reduce((currentRevenue, transaction) => {
            if(transaction.action === firstTradeAction){
                return currentRevenue - (transaction.price * transaction.quantity) - transaction.fee;
            }

            return currentRevenue + (transaction.price * transaction.quantity) - transaction.fee;
        }, 0);

    }, [transactions]);
}

export const useTradeStatus = (trade:Trade):'win' | 'loss' | null => {
    const tradeReturn = useTradeReturn(trade);

    return useMemo(() => {
        if(!tradeReturn) return null;
        return tradeReturn >= 0 ? 'win' : 'loss';
    }, [tradeReturn]);
}

export const useTradeSide = (trade:Trade):'long' | 'short' | null => {
    const transactions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!transactions || transactions.length === 0) return null;
        return transactions[0].action === 'buy' ? 'long' : 'short';
    }, [transactions]);
}

export const useTradeHoldTime = (trade:Trade) => {
    const transactions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!transactions || transactions.length === 0) return null;
        return new Date(transactions[0].datetime);
    }, [transactions]);
}

export const useTradeQuantityBought = (trade:Trade) => {
    const transactions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!transactions || transactions.length === 0) return null;
        const firstTradeAction = transactions[0].action;

        return transactions.reduce((spent:number, transaction:Position) => {
            if(transaction.action !== firstTradeAction) return spent;
            return spent + transaction.quantity;
        }, 0);
    }, [transactions]);
}

export const useTradeTotalQuantity = (trade:Trade) => {
    const transactions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        return transactions.reduce((total:number, transaction:Position) => {
            if(transaction.action === 'buy') return total + transaction.quantity;
            return total - transaction.quantity;
        }, 0);
    }, [transactions]);
}

export const useTradeEntryAverage = (trade:Trade) => {
    const transactions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!transactions || transactions.length === 0) return null;

        const firstTradeAction = transactions[0].action;

        const totalQuantity = transactions.reduce((quantity, transaction) => {
            if(transaction.action !== firstTradeAction) return quantity;
            return quantity + transaction.quantity;
        }, 0);
        
        const totalSpent = transactions.reduce((spent, transaction) => {
            if(transaction.action !== firstTradeAction) return spent;
            return spent + (transaction.quantity * transaction.price);
        }, 0);

        return totalSpent / totalQuantity;
    }, [transactions]);
}

export const useTradeExitAverage = (trade:Trade) => {
    const transactions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!transactions || transactions.length === 0) return null;

        const firstTradeAction = transactions[0].action;

        const totalQuantity = transactions.reduce((quantity, transaction) => {
            if(transaction.action === firstTradeAction) return quantity;
            return quantity + transaction.quantity;
        }, 0);
        
        const totalSpent = transactions.reduce((spent, transaction) => {
            if(transaction.action === firstTradeAction) return spent;
            return spent + transaction.quantity * transaction.price;
        }, 0);

        if(totalQuantity === 0) return null;
        return totalSpent / totalQuantity;
    }, [transactions]);
}

export const useTradeReturnPercentage = (trade:Trade) => {
    const transactions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!transactions || transactions.length === 0) return null;

        const firstTradeAction = transactions[0].action;

        const currentQuantity = transactions.reduce((quantity, transaction) => {
            if(transaction.action === firstTradeAction){
                return quantity + transaction.quantity;
            }

            return quantity - transaction.quantity;
        }, 0);

        if(currentQuantity > 0) return null;

        const totalSpent = transactions.reduce((spent, transaction) => {
            if(transaction.action !== firstTradeAction) return spent;
            return spent + transaction.quantity * transaction.price;
        }, 0);

        const totalSold = transactions.reduce((sold, transaction) => {
            if(transaction.action === firstTradeAction) return sold;
            return sold + transaction.quantity * transaction.price;
        }, 0);
        return totalSold / totalSpent - 1;
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