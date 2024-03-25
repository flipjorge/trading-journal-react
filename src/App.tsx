import GlobalStyle from './styles/Global';
import TradesPage from './pages/TradesPage';
import { Provider } from 'react-redux';
import { store } from './store';
import { StrictMode } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import DarkTheme from './styles/DarkTheme';
const AppStyle = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.primaryBackground};
    color: ${props => props.theme.default};
`

const App = () => {

    return <>
        <GlobalStyle/>
        <StrictMode>
            <ThemeProvider theme={DarkTheme}>
                <Provider store={store}>
                    <AppStyle>
                    </AppStyle>
                </Provider>
            </ThemeProvider>
        </StrictMode>
    </>
}

export default App;