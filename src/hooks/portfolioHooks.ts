import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { useMemo } from "react";
import { Portfolio } from "../models/portfolioModels";
import { addPortfolio, removePortfolio, updatePortfolio } from "../slices/portfoliosSlice";

export const useGetAllPortfolios = () => {
    return useSelector((state:RootState) => state.portfolios);
}

export const useGetPortfolioById = (id:string) => {
    const portfolios = useGetAllPortfolios();
    return useMemo(() => {
        portfolios.filter(portfolio => portfolio.id === id);
    }, [portfolios, id]);
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