import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, html {
        font-family: 'Poppins', sans-serif;
        overflow: hidden;
    }

    ul {
        list-style-type: none;
    }

    table {
        border-collapse: collapse;
    }

    input, button {
        border: none;
        outline: none;
        box-shadow: none;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }

    *::-webkit-scrollbar-track {
        background-color: ${props => props.theme.primaryBackground};
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.secondaryBackground};
        border-radius: 10px;
    }

    *::-webkit-scrollbar-thumb:hover {
        background: white;
    }

    *::-webkit-scrollbar {
        width: 6px;
    }

    .invalidInput {
        border: 2px red solid;
    }
`

export default GlobalStyles;