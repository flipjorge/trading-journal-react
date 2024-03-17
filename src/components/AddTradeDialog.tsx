import { FormEvent, useState } from "react";
import { useAddTrade } from "../hooks/tradeHooks";
import { Trade, Transaction } from "../models/tradeModels";
import { Dialog, Title, MainInfoGrid, PositionsGrid, PositionItemRow, AddPositionItemRow } from '../styles/TradeDialog.styles';
import { useGenerateUUID } from "../hooks/uuidHooks";
import { useAddTransactions } from "../hooks/transactionHooks";

type FormData = {
    symbol:string,
    sl:string,
    tp:string,
    positions:FormPositionItem[]
}

type FormPositionItem = {
    type: 'buy' | 'sell',
    datetime:string,
    quantity:number | undefined,
    price:number | undefined,
    fee:number | undefined
}

type AddTradeDialogProps = {
    onTradeAdded?: () => void
}

const AddTradeDialog = ({onTradeAdded}:AddTradeDialogProps) => {

    const [formData, setFormData] = useState<FormData>({
        symbol: '',
        sl: '',
        tp: '',
        positions: [{
            type: 'buy',
            datetime: '',
            quantity: undefined,
            price: undefined,
            fee: undefined
        },{
            type: 'sell',
            datetime: '',
            quantity: undefined,
            price: undefined,
            fee: undefined
        }]
    });

    const dispatchAddTrade = useAddTrade();
    const dispatchAddTransactions = useAddTransactions();
    const generateTradeId = useGenerateUUID();

    const handleChange = (event:FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const handlePositionItemChange = (index:number, name:string, value:string) => {
        const updatePositions:FormPositionItem[] = formData.positions.map((position, i) => {
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
        const updatePositions:FormPositionItem[] = formData.positions.map((position, i) => {
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

    const handleAddPositionClick = () => {

        const newPositionItem:FormPositionItem = {
            type: "buy",
            datetime: '',
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
        const trade = convertFormDataToTrade(formData);
        dispatchAddTrade(trade);
        const transactions = convertFormDataToTransactions(formData, trade.id);
        dispatchAddTransactions(transactions);
        if(onTradeAdded) onTradeAdded();
    }

    const convertFormDataToTrade = (data:FormData) => {
        
        const trade:Trade = {
            id:generateTradeId(),
            symbol:data.symbol
        }

        console.log(trade);

        return trade;
    }

    const convertFormDataToTransactions = (data:FormData, tradeId:string) => {

        const transactions:Transaction[] = data.positions.map((position) => {
            
            const date = position.datetime ? new Date(position.datetime) : new Date();
            const transaction:Transaction = {
                id:generateTradeId(),
                tradeId:tradeId,
                action:position.type,
                datetime:date.toISOString(),
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
            <Title>New Trade</Title>
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
                    <button type="button" onClick={handleAddPositionClick}>+</button>
                    <div>Add accordingly if you are closing partial positions, or adding to your positions</div>
                </AddPositionItemRow>
            </PositionsGrid>
            <div>
                <button type="submit">Save Trade</button>
            </div>
        </form>
    </Dialog>
}

export default AddTradeDialog;