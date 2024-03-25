import styled from "styled-components";
import AddIcon from "../assets/add-icon.svg?react";

const Button = styled.a`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    stroke: ${props => props.theme.icons};

    svg {
        width: 30px;
        height: 30px;
    }

    &:hover{
        stroke: ${props => props.theme.iconsHover};
    }
`

type Props = {
    onClick:() => void
}

const AddTradeButton = ({onClick}:Props) => {
    return (
        <Button onClick={onClick}>
            <AddIcon/>
        </Button>
    )
}

export default AddTradeButton;