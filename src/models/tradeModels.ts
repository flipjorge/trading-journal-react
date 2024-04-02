export type Trade = {
    id: string,
    portfolioId: string,
    symbol: string,
    sl: number | undefined,
    tp: number | undefined
}

export type Position = {
    id: string,
    tradeId: string,
    action: 'buy' | 'sell',
    datetime: string,
    quantity: number,
    price: number,
    fee: number
}