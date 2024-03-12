import styled from "styled-components";

const Button = styled.a`
        display: flex;
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 100%;
        justify-content: center;
        align-items: center;
        background-color: blue;
        cursor: pointer;
        color: white;
        font-size: 50px;
        font-weight: bold;

        &:hover{
            background-color: darkblue;
        }
    `

const AddTradeButton = () => {
    return <Button>+</Button>
}

export default AddTradeButton;