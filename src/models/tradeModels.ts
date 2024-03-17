export type Trade = {
    id: string,
    symbol: string,
    transactions: TradeTransaction[]
}

export type TradeTransaction = {
    id: string,
    action: 'buy' | 'sell',
    datetime: string,
    quantity: number,
    price: number,
    fee: number
}