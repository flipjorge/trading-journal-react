import TradesList from "../components/TradesList";
import { useGetTradesByPortfolio } from "../hooks/tradeHooks";
import { Trade } from "../models/tradeModels";
import { useOpenDialog } from "../hooks/dialogHooks";
import { useSetSelectedTrade } from "../hooks/selectedTradeHooks";
import { useGetSelectedPortfolio } from "../hooks/selectedPortfolioHooks";
import { PortfolioHeader } from "../components/PortfolioHeader";
import * as Styles from "../styles/TradesPage.styles";


const TradesPage = () => {

    const portfolio = useGetSelectedPortfolio();
    const trades = useGetTradesByPortfolio(portfolio.id);

    const openTradeDialog = useOpenDialog('trade');
    const dispatchSetSelectedTrade = useSetSelectedTrade();

    const handleTradeSelected = (trade:Trade) => {
        dispatchSetSelectedTrade(trade);
        openTradeDialog();
    }

    return (
        <Styles.Container>
            <PortfolioHeader/>
            <TradesList trades={trades} onTradeSelected={handleTradeSelected}/>
        </Styles.Container>
    );
}

export default TradesPage;