import GlobalStyle from './styles/Global';
import TradesPage from './pages/TradesPage';
import { Provider } from 'react-redux';
import { store } from './store';
import { StrictMode } from 'react';

const App = () => {

    return <>
        <GlobalStyle/>
        <StrictMode>
            <Provider store={store}>
                <TradesPage/>
            </Provider>
        </StrictMode>
    </>
}

export default App;