import styled from "styled-components";
import { useOpenDialog } from "../hooks/dialogHooks";
import { useClearSelectedTrade } from "../hooks/selectedTradeHooks";
import AddTradeButton from "./AddTradeButton";

const Style = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 90px;
    padding-top: 70px;
    gap: 50px;
    background-color: ${props => props.theme.secondaryBackground};
`

const LeftPanel = () => {

    const openTradeDialog = useOpenDialog('trade');
    const dispatchClearSelectedTrade = useClearSelectedTrade();

    const handleAddTradeOpen = () => {
        dispatchClearSelectedTrade();
        openTradeDialog();
    }

    return <Style>
        <AddTradeButton onClick={handleAddTradeOpen}/>
    </Style>
}

export default LeftPanel;