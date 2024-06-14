import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store";
import { selectedPortfolio } from "../slices/selectedPortfolioSlice";
import { Portfolio } from "../models/portfolioModels";

export const useGetSelectedPortfolio = () => {
    return useSelector((state:RootState) => state.selectedPortfolio);
}

export const useSetSelectedPortfolio = () => {
    const dispatch = useDispatch();

    return (portfolio:Portfolio) => dispatch(selectedPortfolio(portfolio));
}