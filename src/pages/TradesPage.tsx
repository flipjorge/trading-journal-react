import styled from "styled-components";
import AddTradeButton from "../components/AddTradeButton";

const TradesPage = () => {

    const AddTradeButtonContainer = styled.div`
        position: fixed;
        bottom: 20px;
        right: 20px;
    `

    return <div>
        <AddTradeButtonContainer>
            <AddTradeButton/>
        </AddTradeButtonContainer>
    </div>;
}

export default TradesPage;