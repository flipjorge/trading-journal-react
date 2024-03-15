import { FC, FormEvent, useState } from "react";
import styled from "styled-components";
import { useAddTrade, useGetNextTradeId } from "../hooks/tradeHooks";
import { Trade, TradeTransaction } from "../models/Models";

const Dialog = styled.div`
    background-color: gray;
    width: 1000px;
    height: 700px;
    padding: 10px;
`

const Title = styled.div`
    font-size: 1.5rem;
`

const MainInfoGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 10px;
`

const PositionsGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-column-gap: 10px;
`

const PositionItemRow = styled.div`
    display: contents;
`

const AddPositionItemRow = styled.div`
    display: contents;

    & > div {
        grid-column: 2 / span 4;
    }
`

type FormData = {
    symbol:string,
    sl:string,
    tp:string,
    positions:PositionItem[]
}

type PositionItem = {
    type: 'buy' | 'sell',
    datetime:string,
    quantity:number | undefined,
    price:number | undefined,
    fee:number | undefined
}

type AddTradeDialogProps = {
    dispatchTradeAdded?: () => void
}

const AddTradeDialog:FC<AddTradeDialogProps> = ({dispatchTradeAdded}) => {

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
    const nextTradeId = useGetNextTradeId();

    const handleChange = (event:FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const handlePositionItemChange = (index:number, name:string, value:string) => {
        const updatePositions:PositionItem[] = formData.positions.map((position, i) => {
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
        const updatePositions:PositionItem[] = formData.positions.map((position, i) => {
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

        const newPositionItem:PositionItem = {
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
        dispatchAddTrade(convertFormDataToTrade(formData));
        console.log(formData);
        if(dispatchTradeAdded) dispatchTradeAdded();
    }

    const convertFormDataToTrade = (data:FormData) => {
        
        const positions:TradeTransaction[] = data.positions.map(position => {
            const date = position.datetime ? new Date(position.datetime) : new Date();

            const transaction:TradeTransaction = {
                action:position.type,
                id:nextTradeId,
                datetime:date.toISOString(),
                price:position.price || 0,
                quantity:position.quantity || 0,
                fee:position.fee || 0
            }

            return transaction;
        });
        
        const trade:Trade = {
            id:nextTradeId,
            symbol:data.symbol,
            transactions:positions
        }

        return trade;
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
                        <input name="datetime" value={currentPosition.datetime} onChange={e => handlePositionItemChange(index, e.target.name, e.target.value)} placeholder="Eg. 06/16/2022 01:01 PM"/>
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