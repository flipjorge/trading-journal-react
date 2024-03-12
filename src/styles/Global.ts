import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    * {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }
`

export default GlobalStyles;