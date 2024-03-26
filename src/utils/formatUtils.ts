import { format, formatDistanceToNow } from "date-fns";

type currencyProps = {
    value:number | undefined | null,
    decimals?:number,
    placeholder?:string,
    symbol?:string
}

type dateProps = {
    value:Date | undefined | null,
    formatString:string
    placeholder?:string,
}

type durationProps = {
    value:Date | undefined | null,
    placeholder?:string,
}

export const convertNumberToCurrency = ({value, placeholder = '-', decimals = 2, symbol = '$'}:currencyProps) => {
    if(typeof value !== 'number') return placeholder;
    return `${symbol}${value.toFixed(decimals)}`;
}

export const convertNumberToPercentage = ({value, placeholder = '-', decimals = 2, symbol = '%'}:currencyProps) => {
    if(typeof value !== 'number') return placeholder;
    return `${(value * 100).toFixed(decimals)}${symbol}`;
}

export const convertDateToString = ({value, formatString, placeholder = '-'}:dateProps) => {
    if(!(value instanceof Date)) return placeholder;
    return format(value, formatString);
}

export const convertDateToDurationToNow = ({value,placeholder = '-'}:durationProps) => {
    if(!(value instanceof Date)) return placeholder;
    return formatDistanceToNow(value);
}