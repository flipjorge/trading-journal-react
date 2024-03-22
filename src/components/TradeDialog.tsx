import { FormEvent, useMemo, useState } from "react";
import { useAddTrade, useDeleteTrade, useEditTrade } from "../hooks/tradeHooks";
import { Trade, Transaction } from "../models/tradeModels";
import { Dialog, Title, MainInfoGrid, PositionsGrid, PositionItemRow, AddPositionItemRow } from '../styles/TradeDialog.styles';
import { useGenerateUUID } from "../hooks/uuidHooks";
import { useGetTransactionsByTradeId, useRemoveTransactionsByTradeId, useSetTransactionsForTrade } from "../hooks/transactionHooks";
import { useGetSelectedTrade } from "../hooks/selectedTradeHooks";
import { convertDateToInputFormat } from "../utils/dateTimeUtils";

type FormData = {
    id:string,
    symbol:string,
    sl:number | undefined,
    tp:number | undefined,
    positions:FormTransactionItem[]
}

type FormTransactionItem = {
    id:string,
    type: 'buy' | 'sell',
    datetime:string | undefined,
    quantity:number | undefined,
    price:number | undefined,
    fee:number | undefined
}

type Props = {
    onTradeSaved?: () => void,
    onTradeDeleted?: () => void
}

const TradeDialog = ({onTradeSaved, onTradeDeleted}:Props) => {

    const trade = useGetSelectedTrade();
    const transactions = useGetTransactionsByTradeId(trade?.id || '');

    const dispatchAddTrade = useAddTrade();
    const dispatchEditTrade = useEditTrade();
    const dispatchDeleteTrade = useDeleteTrade();
    const dispatchSetTransactions = useSetTransactionsForTrade();
    const dispatchDeleteTransactionsById = useRemoveTransactionsByTradeId();
    const generateTradeId = useGenerateUUID();

    const formTransactions = useMemo<FormTransactionItem[]>(() => {
        if(trade) {
            return transactions.map(transaction => ({
                id: transaction.id,
                tradeId: transaction.tradeId,
                type: transaction.action,
                datetime: transaction.datetime,
                quantity: transaction.quantity,
                price: transaction.price,
                fee: transaction.fee
            }));
        }

        return [{
            id:generateTradeId(),
            type: 'buy',
            datetime: undefined,
            quantity: undefined,
            price: undefined,
            fee: undefined
        },{
            id:generateTradeId(),
            type: 'sell',
            datetime: undefined,
            quantity: undefined,
            price: undefined,
            fee: undefined
        }];
    }, [trade, transactions, generateTradeId]);

    const [formData, setFormData] = useState<FormData>({
        id: trade?.id || generateTradeId(),
        symbol: trade?.symbol || '',
        sl: trade?.sl || undefined,
        tp: trade?.tp || undefined,
        positions: formTransactions
    });

    const handleChange = (event:FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const handlePositionItemChange = (index:number, name:string, value:string) => {
        const updatePositions:FormTransactionItem[] = formData.positions.map((position, i) => {
            if(i === index) return {
                ...position,
                [name]: value
            };
            return position;
        });

        setFormData({
            ...formData,
            positions:updatePositions
        });
    }

    const handlePositionItemTypeChange = (index:number) => {
        const updatePositions:FormTransactionItem[] = formData.positions.map((position, i) => {
            if(i === index) return {
                ...position,
                type: position.type === 'buy' ? 'sell' : 'buy'
            };
            return position;
        });

        setFormData({
            ...formData,
            positions:updatePositions
        });
    }

    const handleAddTransactionClick = () => {

        const newPositionItem:FormTransactionItem = {
            id:generateTradeId(),
            type: "buy",
            datetime: convertDateToInputFormat(new Date()),
            price: 0,
            quantity: 0,
            fee: 0
        }

        const updatedPositions = [
            ...formData.positions,
            newPositionItem
        ]

        setFormData({
            ...formData,
            positions: updatedPositions
        })
    }

    const handleRemovePositionClick = (index:number) => {

        const updatedPositions = formData.positions.filter((_item, currentIndex) =>
            index !== currentIndex
        );

        setFormData({
            ...formData,
            positions: updatedPositions
        })
    }

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const updatedTrade = convertFormDataToTrade(formData);
        if(trade){
            dispatchEditTrade(updatedTrade);
        } else {
            dispatchAddTrade(updatedTrade);
        }
        
        const transactions = convertFormDataToTransactions(formData, updatedTrade.id);
        dispatchSetTransactions(updatedTrade.id, transactions);
        
        if(onTradeSaved) onTradeSaved();
    }

    const handleDelete = () => {

        if(!trade) return;

        dispatchDeleteTrade(trade);
        dispatchDeleteTransactionsById(trade.id);
        
        if(onTradeDeleted) onTradeDeleted();
    }

    const convertFormDataToTrade = (data:FormData) => {
        
        const updatedTrade:Trade = {
            id:data.id,
            symbol:data.symbol,
            sl:data.sl,
            tp:data.tp
        }

        console.log(updatedTrade);

        return updatedTrade;
    }

    const convertFormDataToTransactions = (data:FormData, tradeId:string) => {

        const transactions:Transaction[] = data.positions.map((position) => {
            
            const date = position.datetime ? new Date(position.datetime) : new Date();
            const transaction:Transaction = {
                id:position.id,
                tradeId:tradeId,
                action:position.type,
                datetime:convertDateToInputFormat(date),
                price:position.price || 0,
                quantity:position.quantity || 0,
                fee:position.fee || 0
            }

            return transaction;
        });

        console.log(transactions);

        return transactions;
    }

    return <Dialog>
        <form onSubmit={handleSubmit}>
            <Title>{trade ? 'Edit Trade' : 'New Trade'}</Title>
            <MainInfoGrid>
                <label htmlFor="symbol">Token</label>
                <label htmlFor="sl">Stop Loss</label>
                <label htmlFor="tp">TakeProfit</label>
                <input id="symbol" name="symbol" value={formData.symbol} onChange={handleChange} placeholder="Eg. btc, etg, link, avax..." required/>
                <input id="sl" name="sl" value={formData.sl} onChange={handleChange} type="number" placeholder="Eg. 21.3456"/>
                <input id="tp" name="tp" value={formData.tp} onChange={handleChange} type="number" placeholder="Eg. 22.3456"/>
            </MainInfoGrid>
            <PositionsGrid>
                <div>Position Type</div>
                <div>Date/Time</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Fee</div>

                {formData.positions.map((item, index) => {

                    const currentPosition = formData.positions[index];
                    const quantityValue = currentPosition.quantity !== undefined ? currentPosition.quantity : '';
                    const priceValue = currentPosition.price !== undefined ? currentPosition.price : '';
                    const feeValue = currentPosition.fee !== undefined ? currentPosition.fee : '';

                    return <PositionItemRow key={index}>
                        <div>
                            <button type="button" onClick={() => handleRemovePositionClick(index)}>x</button>
                            <button type="button" onClick={() => handlePositionItemTypeChange(index)}>{item.type === "buy" ? "Buy/Long" : "Sell/Short"}</button>
                        </div>
                        <input name="datetime" value={currentPosition.datetime} onChange={e => handlePositionItemChange(index, e.target.name, e.target.value)} type="datetime-local" placeholder="Eg. 06/16/2022 01:01 PM"/>
                        <input name="quantity" value={quantityValue} onChange={e => handlePositionItemChange(index, e.target.name, e.target.value)} type="number" placeholder="Eg. 3.21"/>
                        <input name="price" value={priceValue} onChange={e => handlePositionItemChange(index, e.target.name, e.target.value)} type="number" placeholder="Eg. 123.02"/>
                        <input name="fee" value={feeValue} onChange={e => handlePositionItemChange(index, e.target.name, e.target.value)} type="number" placeholder="Eg. 0.05"/>
                    </PositionItemRow>
                })}

                <AddPositionItemRow>
                    <button type="button" onClick={handleAddTransactionClick}>+</button>
                    <div>Add accordingly if you are closing partial positions, or adding to your positions</div>
                </AddPositionItemRow>
            </PositionsGrid>
            <div>
                <button type="submit">'Save Trade'</button>
            </div>
            {trade && <div>
                <button type="button" onClick={handleDelete}>Delete Trade</button>
            </div>}
        </form>
    </Dialog>
}

export default TradeDialog;