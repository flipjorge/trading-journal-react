import styled from "styled-components";
import AddTradeButton from "../components/AddTradeButton";
import TradesList from "../components/TradesList";
import { useGetAllTrades } from "../hooks/tradeHooks";
import TradeDialog from "../components/TradeDialog";
import { Trade } from "../models/tradeModels";
import DialogContainer from "../components/DialogContainer";
import { useCloseDialog, useOpenDialog } from "../hooks/dialogHooks";
import { useClearSelectedTrade, useSetSelectedTrade } from "../hooks/selectedTradeHooks";

const AddTradeButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
`

const TradesPage = () => {

    const trades = useGetAllTrades();

    const openTradeDialog = useOpenDialog('trade');
    const closeTradeDialog = useCloseDialog('trade');

    const dispatchSetSelectedTrade = useSetSelectedTrade();
    const dispatchClearSelectedTrade = useClearSelectedTrade();

    const handleAddTradeOpen = () => {
        dispatchClearSelectedTrade();
        openTradeDialog();
    }

    const handleTradeSelected = (trade:Trade) => {
        dispatchSetSelectedTrade(trade);
        openTradeDialog();
    }

    const handleTradeSaved = () => {
        closeTradeDialog();
        dispatchClearSelectedTrade();
    }

    return <div>
        <TradesList trades={trades} onTradeSelected={handleTradeSelected}/>
        <AddTradeButtonContainer>
            <AddTradeButton onClick={handleAddTradeOpen}/>
        </AddTradeButtonContainer>
        <DialogContainer dialogName="trade">
            <TradeDialog
                onTradeSaved={handleTradeSaved}
                onTradeDeleted={handleTradeSaved}/>
        </DialogContainer>
    </div>;
}

export default TradesPage;