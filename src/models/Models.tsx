export interface Trade {
    symbol: string,
    transactions: TradeTransaction[]
}

export interface TradeTransaction {
    action: 'buy' | 'sell',
    datetime: Date,
    quantity: number,
    price: number,
    fee: number
}