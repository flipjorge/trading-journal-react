export interface Trade {
    id: number,
    symbol: string,
    transactions: TradeTransaction[]
}

export interface TradeTransaction {
    id: number,
    action: 'buy' | 'sell',
    datetime: string,
    quantity: number,
    price: number,
    fee: number
}