import styled from "styled-components";
import { Trade } from "../models/tradeModels";
import { useTradeEntryPrice, useTradeEntryTotal,
    useTradeFirstDate, useTradeTotalQuantity } from "../hooks/tradeHooks";

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: lightgray;
    border: 1px solid gray;
    font-size: 1.8;
    text-transform: uppercase;
`

type TradeListItemProps = {
    trade:Trade,
    onSelected?:(trade:Trade) => void
}

const TradesListItem = ({trade, onSelected}:TradeListItemProps) => {

    const date = useTradeFirstDate(trade);
    const entryPrice = useTradeEntryPrice(trade);
    const entryTotal = useTradeEntryTotal(trade);
    const totalQuantity = useTradeTotalQuantity(trade);

    const handleItemClick = () => {
        if(onSelected) onSelected(trade);
    }

    return <Item onClick={handleItemClick}>
        <div>{date}</div>
        <div>{trade.symbol}</div>
        <div>{entryPrice}</div>
        <div>{entryTotal}</div>
        <div>{totalQuantity}</div>
    </Item>
};

export default TradesListItem;