import TradesList from "../components/TradesList";
import { useGetAllTrades } from "../hooks/tradeHooks";
import { Trade } from "../models/tradeModels";
import { useOpenDialog } from "../hooks/dialogHooks";
import { useSetSelectedTrade } from "../hooks/selectedTradeHooks";


const TradesPage = () => {

    const trades = useGetAllTrades();

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