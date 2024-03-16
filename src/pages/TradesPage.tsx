import styled from "styled-components";
import AddTradeButton from "../components/AddTradeButton";
import TradesList from "../components/TradesList";
import { useGetAllTrades } from "../hooks/tradeHooks";
import AddTradeDialog from "../components/AddTradeDialog";
import { useRef, useState } from "react";
import EditTradeDialog from "../components/EditTradeDialog";
import { Trade } from "../models/tradeModels";

const AddTradeButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
`

const AddTradeDialogContainer = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    top:0;
    z-index: 100;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.2);
    backdrop-filter: blur(2px);
`

const TradesPage = () => {

    const trades = useGetAllTrades();

    const [isAddTradeDialogVisible, setIsAddTradeDialogVisible] = useState(false);
    const [isEditTradeDialogVisible, setIsEditTradeDialogVisible] = useState(false);
    const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
    const addTradeDialogRef = useRef(null);
    const editTradeDialogRef = useRef(null);

    const handleAddTradeOpen = () => {
        setIsAddTradeDialogVisible(true);
    }

    const handleAddTradeClose = (e:React.MouseEvent) => {
        if(addTradeDialogRef.current !== e.target) return;
        setIsAddTradeDialogVisible(false);
    }

    const handleEditTradeClose = (e:React.MouseEvent) => {
        if(editTradeDialogRef.current !== e.target) return;
        setIsEditTradeDialogVisible(false);
    }

    const handleTradeSelected = (trade:Trade) => {
        setSelectedTrade(trade);
        setIsEditTradeDialogVisible(true);
    }

    const handleTradeAdded = () => {
        setIsAddTradeDialogVisible(false);
    }

    const handleTradeEdited = () => {
        setIsEditTradeDialogVisible(false);
        setSelectedTrade(null);
    }

    return <div>
        <TradesList trades={trades} onTradeSelected={handleTradeSelected}/>
        <AddTradeButtonContainer>
            <AddTradeButton onClick={handleAddTradeOpen}/>
        </AddTradeButtonContainer>
        {isAddTradeDialogVisible &&
        <AddTradeDialogContainer
            ref={addTradeDialogRef}
            onClick={handleAddTradeClose}>
            <AddTradeDialog onTradeAdded={handleTradeAdded}/>
        </AddTradeDialogContainer>}
        {isEditTradeDialogVisible && selectedTrade && 
        <AddTradeDialogContainer
            ref={editTradeDialogRef}
            onClick={handleEditTradeClose}>
            <EditTradeDialog trade={selectedTrade}
                onTradeEdited={handleTradeEdited}
                onTradeDeleted={handleTradeEdited}/>
        </AddTradeDialogContainer>}
    </div>;
}

export default TradesPage;