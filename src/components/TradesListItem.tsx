
import { Trade } from "../models/tradeModels";
import { useTradeEntryAverage,
    useTradeHoldTime,
    useTradeOpenDate,
    useTradeReturn,
    useTradeSide,
    useTradeStatus,
    useTradeQuantityBought, 
    useTradeExitAverage,
    useTradeReturnPercentage} from "../hooks/tradeHooks";
import * as Styles from '../styles/TradesListItem.styles';
import SideIcon from '../assets/type-arrow-icon.svg?react';
import { convertDateToDurationToNow, convertDateToString, convertNumberToCurrency, convertNumberToPercentage } from "../utils/formatUtils";

type props = {
    trade:Trade,
    onSelected?:(trade:Trade) => void
}

const TradesListItem = ({trade, onSelected}:props) => {

    const date = useTradeOpenDate(trade);
    const tradeReturn = useTradeReturn(trade);
    const status = useTradeStatus(trade);
    const side = useTradeSide(trade);
    const holdDuration = useTradeHoldTime(trade);
    const entryAveragePrice = useTradeEntryAverage(trade);
    const exitAveragePrice = useTradeExitAverage(trade);
    const quantityBought = useTradeQuantityBought(trade);
    const returnPercentage = useTradeReturnPercentage(trade);

    const handleItemClick = () => {
        if(onSelected) onSelected(trade);
    }

    return <Styles.Row onClick={handleItemClick}>
        <Styles.Cell>{convertDateToString({value:date, formatString:"dd MMM"})}</Styles.Cell>
        <Styles.Cell>{trade.symbol.toUpperCase()}</Styles.Cell>
        <Styles.Cell><Styles.StatusField $state={status}>{status || '-'}</Styles.StatusField></Styles.Cell>
        <Styles.Cell><Styles.SideField $side={side}><SideIcon/></Styles.SideField></Styles.Cell>
        <Styles.Cell>{convertDateToDurationToNow({value:holdDuration})}</Styles.Cell>
        <Styles.Cell>{quantityBought}</Styles.Cell>
        <Styles.Cell>{convertNumberToCurrency({value:entryAveragePrice})}</Styles.Cell>
        <Styles.Cell>{convertNumberToCurrency({value:exitAveragePrice})}</Styles.Cell>
        <Styles.Cell>{convertNumberToCurrency({value:tradeReturn})}</Styles.Cell>
        <Styles.Cell>{convertNumberToPercentage({value:returnPercentage})}</Styles.Cell>
    </Styles.Row>
};

export default TradesListItem;