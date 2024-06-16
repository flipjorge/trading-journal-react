import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store";
import { Trade, Position } from "../models/tradeModels";
import { useMemo } from "react";
import { addTrade, removeTrade, updateTrade } from "../slices/tradesSlice";
import { useGetPositionsByTradeId, useGetPositionsByTrades } from "./positionHooks";

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
    const positions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!positions || positions.length === 0) return null;
        return new Date(positions[0].datetime);
    }, [positions]);
}

export const useTradesBalance = (trades:Trade[]) => {
    const positions = useGetPositionsByTrades(trades);

    return useMemo(() => {
        if(!positions || positions.length === 0) return null;

        return trades.reduce((currentBalance, trade) => {
            const tradePositions = positions.filter(position => position.tradeId === trade.id);
            const firstTradeAction = tradePositions[0].action;

            return currentBalance + tradePositions.reduce((currentTradeRevenue, tradePosition) => {
                if(tradePosition.action === firstTradeAction){
                    return currentTradeRevenue - (tradePosition.price * tradePosition.quantity) - tradePosition.fee;
                }

                return currentTradeRevenue + (tradePosition.price * tradePosition.quantity) - tradePosition.fee;
            }, 0);

        }, 0);

    }, [positions]);
}

export const useTradeReturn = (trade:Trade):number | null => {
    const positions = useGetPositionsByTradeId(trade.id);

    return useMemo(() => {
        if(!positions || positions.length === 0) return null;

        const firstTradeAction = positions[0].action;

        const quantity = positions.reduce((currentQuantity, transaction) => {
            if(transaction.action === firstTradeAction){
                return currentQuantity + transaction.quantity;
            }

            return currentQuantity - transaction.quantity;
        }, 0);

        if(quantity > 0) return null;

        return positions.reduce((currentRevenue, transaction) => {
            if(transaction.action === firstTradeAction){
                return currentRevenue - (transaction.price * transaction.quantity) - transaction.fee;
            }

            return currentRevenue + (transaction.price * transaction.quantity) - transaction.fee;
        }, 0);

    }, [positions]);
}

export const useTradeStatus = (trade:Trade):'win' | 'loss' | null => {
    const tradeReturn = useTradeReturn(trade);

    return useMemo(() => {
        if(!tradeReturn) return null;
        return tradeReturn >= 0 ? 'win' : 'loss';
    }, [tradeReturn]);
}

export const useTradeSide = (trade:Trade):'long' | 'short' | null => {
    const positions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!positions || positions.length === 0) return null;
        return positions[0].action === 'buy' ? 'long' : 'short';
    }, [positions]);
}

export const useTradeHoldTime = (trade:Trade) => {
    const positions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!positions || positions.length === 0) return null;
        return new Date(positions[0].datetime);
    }, [positions]);
}

export const useTradeQuantityBought = (trade:Trade) => {
    const positions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!positions || positions.length === 0) return null;
        const firstTradeAction = positions[0].action;

        return positions.reduce((spent:number, transaction:Position) => {
            if(transaction.action !== firstTradeAction) return spent;
            return spent + transaction.quantity;
        }, 0);
    }, [positions]);
}

export const useTradeTotalQuantity = (trade:Trade) => {
    const positions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        return positions.reduce((total:number, transaction:Position) => {
            if(transaction.action === 'buy') return total + transaction.quantity;
            return total - transaction.quantity;
        }, 0);
    }, [positions]);
}

export const useTradeEntryAverage = (trade:Trade) => {
    const positions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!positions || positions.length === 0) return null;

        const firstTradeAction = positions[0].action;

        const totalQuantity = positions.reduce((quantity, transaction) => {
            if(transaction.action !== firstTradeAction) return quantity;
            return quantity + transaction.quantity;
        }, 0);
        
        const totalSpent = positions.reduce((spent, transaction) => {
            if(transaction.action !== firstTradeAction) return spent;
            return spent + (transaction.quantity * transaction.price);
        }, 0);

        return totalSpent / totalQuantity;
    }, [positions]);
}

export const useTradeExitAverage = (trade:Trade) => {
    const positions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!positions || positions.length === 0) return null;

        const firstTradeAction = positions[0].action;

        const totalQuantity = positions.reduce((quantity, transaction) => {
            if(transaction.action === firstTradeAction) return quantity;
            return quantity + transaction.quantity;
        }, 0);
        
        const totalSpent = positions.reduce((spent, transaction) => {
            if(transaction.action === firstTradeAction) return spent;
            return spent + transaction.quantity * transaction.price;
        }, 0);

        if(totalQuantity === 0) return null;
        return totalSpent / totalQuantity;
    }, [positions]);
}

export const useTradeReturnPercentage = (trade:Trade) => {
    const positions = useGetPositionsByTradeId(trade.id);
    return useMemo(() => {
        if(!positions || positions.length === 0) return null;

        const firstTradeAction = positions[0].action;

        const currentQuantity = positions.reduce((quantity, transaction) => {
            if(transaction.action === firstTradeAction){
                return quantity + transaction.quantity;
            }

            return quantity - transaction.quantity;
        }, 0);

        if(currentQuantity > 0) return null;

        const totalSpent = positions.reduce((spent, transaction) => {
            if(transaction.action !== firstTradeAction) return spent;
            return spent + transaction.quantity * transaction.price;
        }, 0);

        const totalSold = positions.reduce((sold, transaction) => {
            if(transaction.action === firstTradeAction) return sold;
            return sold + transaction.quantity * transaction.price;
        }, 0);
        return totalSold / totalSpent - 1;
    }, [positions]);
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