import styled from "styled-components";
import AddTradeButton from "../components/AddTradeButton";
import TradesList from "../components/TradesList";
import { useGetAllTrades } from "../hooks/tradeHooks";

const AddTradeButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
`

const TradesPage = () => {

    const trades = useGetAllTrades();

    return <div>
        <TradesList trades={trades}/>
        <AddTradeButtonContainer>
            <AddTradeButton/>
        </AddTradeButtonContainer>
    </div>;
}

export default TradesPage;