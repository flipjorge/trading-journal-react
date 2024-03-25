import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
    }

    body, html {
        font-family: 'Roboto', sans-serif;
        overflow: hidden;
    }

    .invalidInput {
        border: 2px red solid;
    }
`

export default GlobalStyles;