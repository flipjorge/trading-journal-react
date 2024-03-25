import styled from 'styled-components';
import { Trade } from '../models/tradeModels';
import TradesListItem from './TradesListItem';

const List = styled.div`
    display: block;
    position: relative;
    margin: 16px;
    
    .header {
        display: flex;
        justify-content: space-between;
        padding-left: 30px;
    }

    ul {
        display: block;
        list-style-type: none;
    }

    li {
        margin-bottom: 10px;
    }
`

type TradesListProps = {
    trades:Trade[],
    onTradeSelected?:(trade:Trade) => void
}

const TradesList = ({trades, onTradeSelected}:TradesListProps) => {

    const handleItemSelected = (trade:Trade) => {
        if(onTradeSelected) onTradeSelected(trade);
    }

    return <List>
        <ul className='header'>
            <li>Date</li>
            <li>Symbol</li>
            <li>Entry Price</li>
            <li>Entry Total</li>
            <li>Quantity</li>
        </ul>
        <ul>
            {trades.map(trade => (
                <TradesListItem key={trade.id} trade={trade} onSelected={handleItemSelected}/>
            ))}
        </ul>
    </List>
}

export default TradesList;