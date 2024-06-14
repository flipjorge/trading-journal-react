import TradesList from "../components/TradesList";
import { useGetTradesByPortfolio } from "../hooks/tradeHooks";
import { Trade } from "../models/tradeModels";
import { useOpenDialog } from "../hooks/dialogHooks";
import { useSetSelectedTrade } from "../hooks/selectedTradeHooks";
import { useGetSelectedPortfolio } from "../hooks/selectedPortfolioHooks";


const TradesPage = () => {

    const portfolio = useGetSelectedPortfolio();
    const trades = useGetTradesByPortfolio(portfolio.id);

    const openTradeDialog = useOpenDialog('trade');
    const dispatchSetSelectedTrade = useSetSelectedTrade();

    const handleTradeSelected = (trade:Trade) => {
        dispatchSetSelectedTrade(trade);
        openTradeDialog();
    }

    return <>
        <TradesList trades={trades} onTradeSelected={handleTradeSelected}/>
    </>;
}

export default TradesPage;