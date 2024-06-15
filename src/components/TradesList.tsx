import styled from 'styled-components';
import { Trade } from '../models/tradeModels';
import TradesListItem from './TradesListItem';

const Grid = styled.div`
    display: grid;
    align-self: start;
    grid-template-columns: repeat(10, auto);
    width: 100%;
    margin-right: 4px;
    row-gap: 24px;
    overflow-y: auto;
    max-height: 100vh;
`

const HeadRow = styled.div`
    display: contents;
    color: ${props => props.theme.label};

    div {
        height: 24px;
        padding: 0 8px;
        margin-bottom: -4px;
    }

    div:first-child {
        margin-left: 36px;
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

    return <Grid>
        <HeadRow>
            <div>Date</div>
            <div>Token</div>
            <div>Status</div>
            <div>Side</div>
            <div>Hold</div>
            <div>Qty</div>
            <div>Entry</div>
            <div>Exit</div>
            <div>Return</div>
            <div>Return %</div>
        </HeadRow>
        {trades.map(trade => (
            <TradesListItem key={trade.id} trade={trade} onSelected={handleItemSelected}/>
        ))}    
    </Grid>
}

export default TradesList;