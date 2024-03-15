import styled from "styled-components";
import { Trade } from "../models/Models";
import { useTradeEntryPrice, useTradeEntryTotal,
    useTradeFirstDate, useTradeTotalQuantity } from "../hooks/tradeHooks";
import { FC } from "react";

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
    dispatchSelected?:(trade:Trade) => void
}

const TradesListItem:FC<TradeListItemProps> = ({trade, dispatchSelected}) => {

    const date = useTradeFirstDate(trade);
    const entryPrice = useTradeEntryPrice(trade);
    const entryTotal = useTradeEntryTotal(trade);
    const totalQuantity = useTradeTotalQuantity(trade);

    const handleItemClick = () => {
        if(dispatchSelected) dispatchSelected(trade);
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