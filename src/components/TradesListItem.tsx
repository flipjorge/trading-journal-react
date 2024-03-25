import styled from "styled-components";
import { Trade } from "../models/tradeModels";
import { useTradeEntryPrice, useTradeEntryTotal,
    useTradeFirstDate, useTradeTotalQuantity } from "../hooks/tradeHooks";

const Item = styled.div`
    display: contents;
    
    div {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 86px;
        padding: 26px 4px;
        background-color: ${props => props.theme.secondaryBackground};
    }

    div:first-child {
        border-radius: 10px 0 0 10px;
        padding-left: 36px;
    }

    div:last-child {
        border-radius: 0 10px 10px 0;
    }
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
        <div>{totalQuantity}</div>
        <div>{totalQuantity}</div>
        <div>{totalQuantity}</div>
        <div>{totalQuantity}</div>
        <div>{totalQuantity}</div>
    </Item>
};

export default TradesListItem;