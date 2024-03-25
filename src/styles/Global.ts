import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
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

    .invalidInput {
        border: 2px red solid;
    }
`

export default GlobalStyles;