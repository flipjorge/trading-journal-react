import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store";
import { useMemo } from "react";
import { Position, Trade } from "../models/tradeModels";
import { addPosition, updatePosition, removePosition, addPositions,
    updatePositions, removePositionsByTradeId, setPositionsForTrade } from "../slices/positionsSlice";

export const useGetAllPositions = () => {
    return useSelector((state:RootState) => state.positions);
}

export const useGetPositionsByTradeId = (tradeId:string) => {
    const positions = useGetAllPositions();

    return useMemo(() => {
        return positions.filter(position => position.tradeId === tradeId);
    }, [positions, tradeId]);
}

export const useGetPositionsByTrades = (trades:Trade[]) => {
    const positions = useGetAllPositions();
    const tradesIds = trades.map(trade => trade.id);

    return useMemo(() => {
        return positions.filter(position => tradesIds.includes(position.tradeId));
    }, [tradesIds]);
}

export const useAddPosition = () => {
    const dispatch = useDispatch();

    return (position:Position) => dispatch(addPosition(position));
}

export const useAddPositions = () => {
    const dispatch = useDispatch();

    return (positions:Position[]) => dispatch(addPositions(positions));
}

export const useUpdatePosition = () => {
    const dispatch = useDispatch();

    return (position:Position) => dispatch(updatePosition(position));
}

export const useUpdatePositions = () => {
    const dispatch = useDispatch();

    return (positions:Position[]) => dispatch(updatePositions(positions));
}

export const useSetPositionsForTrade = () => {
    const dispatch = useDispatch();

    return (tradeId:string, positions:Position[]) => 
        dispatch(setPositionsForTrade({tradeId, positions}));
}

export const useRemovePosition = () => {
    const dispatch = useDispatch();

    return (positionId:string) => dispatch(removePosition(positionId));
}

export const useRemovePositionsByTradeId = () => {
    const dispatch = useDispatch();

    return (tradeId:string) => dispatch(removePositionsByTradeId(tradeId));
}