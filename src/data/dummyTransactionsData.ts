import { Transaction } from "../models/tradeModels";

export const dummyTransactionsData:Transaction[] = [
    {
        id:'0',
        tradeId:'0',
        action:'buy',
        datetime: new Date("2024-03-10 14:30:00").toISOString(),
        price: 12000,
        quantity: 1,
        fee: 0.0001
    },{
        id:'1',
        tradeId:'0',
        action:'sell',
        datetime: new Date("2024-03-10 14:40:00").toISOString(),
        price: 14000,
        quantity: 1,
        fee: 0.0001
    },{
        id:'2',
        tradeId:'1',
        action:'buy',
        datetime: new Date("2024-03-11 14:30:00").toISOString(),
        price: 12000,
        quantity: 1.6,
        fee: 0.0001
    },{
        id:'3',
        tradeId:'1',
        action:'sell',
        datetime: new Date("2024-03-11 14:40:00").toISOString(),
        price: 14000,
        quantity: 0.6,
        fee: 0.0001
    },{
        id:'4',
        tradeId:'1',
        action:'sell',
        datetime: new Date("2024-03-11 14:50:00").toISOString(),
        price: 14450,
        quantity: 1,
        fee: 0.00011
    },{
        id:'5',
        tradeId:'2',
        action:'buy',
        datetime: new Date("2024-03-12 10:15:00").toISOString(),
        price: 1700,
        quantity: 3,
        fee: 0.02
    }
]