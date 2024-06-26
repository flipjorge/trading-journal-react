import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { useMemo } from "react";
import { Portfolio } from "../models/portfolioModels";
import { addPortfolio, removePortfolio, updatePortfolio } from "../slices/portfoliosSlice";
import { useGetTradesByPortfolio, useTradesBalance, useTradesWinRate } from "./tradeHooks";

export const useGetAllPortfolios = () => {
    return useSelector((state:RootState) => state.portfolios);
}

export const useGetPortfolioById = (id:string) => {
    const portfolios = useGetAllPortfolios();
    return useMemo(() => {
        return portfolios.find(portfolio => portfolio.id === id);
    }, [portfolios, id]);
}

export const usePortfolioBalance = (id:string) => {
    const portfolio = useGetPortfolioById(id);

    if(!portfolio) return 0;

    const trades = useGetTradesByPortfolio(portfolio.id);

    return useTradesBalance(trades);
}

export const usePortfolioWinRate = (id:string) => {
    const portfolio = useGetPortfolioById(id);

    if(!portfolio) return null;

    const trades = useGetTradesByPortfolio(portfolio.id);

    return useTradesWinRate(trades);
}

export const useAddPortfolio = () => {
    const dispatch = useDispatch();
    
    return (portfolio:Portfolio) => dispatch(addPortfolio(portfolio));
}

export const useEditPortfolio = () => {
    const dispatch = useDispatch();
    
    return (portfolio:Portfolio) => dispatch(updatePortfolio(portfolio));
}

export const useDeletePortfolio = () => {
    const dispatch = useDispatch();

    return (portfolio:Portfolio) => dispatch(removePortfolio(portfolio.id));
}