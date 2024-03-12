import styled from 'styled-components';
import { Trade } from '../models/Models';
import TradesListItem from './TradesListItem';

const List = styled.div`
    display: block;
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

const TradesList = ({trades}:{trades:Trade[]}) => {
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
                <TradesListItem key={trade.id} trade={trade}/>
            ))}
        </ul>
    </List>
}

export default TradesList;