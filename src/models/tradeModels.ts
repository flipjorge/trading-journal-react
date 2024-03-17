export type Trade = {
    id: string,
    symbol: string
}

export type Transaction = {
    id: string,
    tradeId: string,
    action: 'buy' | 'sell',
    datetime: string,
    quantity: number,
    price: number,
    fee: number
}