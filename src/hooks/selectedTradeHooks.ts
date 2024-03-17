import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { Trade } from "../models/tradeModels";
import { clearSelectedTrade, selectTrade } from "../slices/selectedTradeSlice";

export const useGetSelectedTrade = () => {
    return useSelector((state:RootState) => state.selectedTrade);
}

export const useSetSelectedTrade = () => {
    const dispatch = useDispatch();

    return (trade:Trade) => dispatch(selectTrade(trade));
}

export const useClearSelectedTrade = () => {
    const dispatch = useDispatch();

    return () => dispatch(clearSelectedTrade());
}