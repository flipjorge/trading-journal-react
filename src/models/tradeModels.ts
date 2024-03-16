export type Trade = {
    id: number,
    symbol: string,
    transactions: TradeTransaction[]
}

export type TradeTransaction = {
    id: number,
    action: 'buy' | 'sell',
    datetime: string,
    quantity: number,
    price: number,
    fee: number
}