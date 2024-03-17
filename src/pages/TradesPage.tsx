import styled from "styled-components";
import AddTradeButton from "../components/AddTradeButton";
import TradesList from "../components/TradesList";
import { useGetAllTrades } from "../hooks/tradeHooks";
import AddTradeDialog from "../components/AddTradeDialog";
import { useState } from "react";
import EditTradeDialog from "../components/EditTradeDialog";
import { Trade } from "../models/tradeModels";
import DialogContainer from "../components/DialogContainer";
import { useCloseDialog, useOpenDialog } from "../hooks/dialogHooks";

const AddTradeButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
`

const TradesPage = () => {

    const trades = useGetAllTrades();

    const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

    const openAddDialog = useOpenDialog('add');
    const closeAddDialog = useCloseDialog('add');
    const openEditDialog = useOpenDialog('edit');
    const closeEditDialog = useCloseDialog('edit');

    const handleAddTradeOpen = () => {
        openAddDialog();
    }

    const handleTradeSelected = (trade:Trade) => {
        setSelectedTrade(trade);
        openEditDialog();
    }

    const handleTradeAdded = () => {
        closeAddDialog();
    }

    const handleTradeEdited = () => {
        closeEditDialog();
        setSelectedTrade(null);
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
            {selectedTrade && <EditTradeDialog trade={selectedTrade}
                onTradeEdited={handleTradeEdited}
                onTradeDeleted={handleTradeEdited}/>}
        </DialogContainer>
    </div>;
}

export default TradesPage;