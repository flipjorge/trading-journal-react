import styled from "styled-components";
import AddTradeButton from "../components/AddTradeButton";
import TradesList from "../components/TradesList";
import { useGetAllTrades } from "../hooks/tradeHooks";
import AddTradeDialog from "../components/AddTradeDialog";
import { useRef, useState } from "react";

const AddTradeButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
`

const AddTradeDialogContainer = styled.div<{$isVisible:boolean}>`
    position: fixed;
    display: ${ ({$isVisible}) => $isVisible ? 'flex' : 'none' };
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
    const addTradeDialogRef = useRef(null);

    const handleAddTradeOpen = () => {
        setIsAddTradeDialogVisible(true);
    }

    const handleAddTradeClose = (e:React.MouseEvent) => {
        if(addTradeDialogRef.current !== e.target) return;
        setIsAddTradeDialogVisible(false);
    }

    const handleTradeAdded = () => {
        setIsAddTradeDialogVisible(false);
    }

    return <div>
        <TradesList trades={trades}/>
        <AddTradeButtonContainer>
            <AddTradeButton onClick={handleAddTradeOpen}/>
        </AddTradeButtonContainer>
        <AddTradeDialogContainer
            ref={addTradeDialogRef}
            $isVisible={isAddTradeDialogVisible}
            onClick={handleAddTradeClose}>
            <AddTradeDialog dispatchTradeAdded={handleTradeAdded}/>
        </AddTradeDialogContainer>
    </div>;
}

export default TradesPage;