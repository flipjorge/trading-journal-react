import styled from "styled-components";
import AddTradeButton from "../components/AddTradeButton";
import TradesList from "../components/TradesList";
import { useGetAllTrades } from "../hooks/tradeHooks";
import AddTradeDialog from "../components/AddTradeDialog";
import EditTradeDialog from "../components/EditTradeDialog";
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

    const openAddDialog = useOpenDialog('add');
    const closeAddDialog = useCloseDialog('add');
    const openEditDialog = useOpenDialog('edit');
    const closeEditDialog = useCloseDialog('edit');

    const dispatchSetSelectedTrade = useSetSelectedTrade();
    const dispatchClearSelectedTrade = useClearSelectedTrade();

    const handleAddTradeOpen = () => {
        openAddDialog();
    }

    const handleTradeSelected = (trade:Trade) => {
        dispatchSetSelectedTrade(trade);
        openEditDialog();
    }

    const handleTradeAdded = () => {
        closeAddDialog();
    }

    const handleTradeEdited = () => {
        closeEditDialog();
        dispatchClearSelectedTrade();
    }

    return <div>
        <TradesList trades={trades} onTradeSelected={handleTradeSelected}/>
        <AddTradeButtonContainer>
            <AddTradeButton onClick={handleAddTradeOpen}/>
        </AddTradeButtonContainer>
        <DialogContainer dialogName="add">
            <AddTradeDialog onTradeAdded={handleTradeAdded}/>
        </DialogContainer>
        <DialogContainer dialogName="edit">
            <EditTradeDialog
                onTradeEdited={handleTradeEdited}
                onTradeDeleted={handleTradeEdited}/>
        </DialogContainer>
    </div>;
}

export default TradesPage;