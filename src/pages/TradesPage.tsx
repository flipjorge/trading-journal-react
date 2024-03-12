import styled from "styled-components";
import AddTradeButton from "../components/AddTradeButton";

const AddTradeButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
`

const TradesPage = () => {
    return <div>
        <AddTradeButtonContainer>
            <AddTradeButton/>
        </AddTradeButtonContainer>
    </div>;
}

export default TradesPage;