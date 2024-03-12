import GlobalStyle from './styles/Global';
import TradesPage from './pages/TradesPage';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {

    return <>
        <GlobalStyle/>
        <Provider store={store}>
            <TradesPage/>
        </Provider>
    </>
}

export default App;