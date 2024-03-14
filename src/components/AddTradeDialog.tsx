import { FC, FormEvent, useState } from "react";
import styled from "styled-components";

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
    type: 'long' | 'short',
    datetime:string | undefined,
    quantity:number | undefined,
    price:number | undefined,
    fee:number | undefined
}

type AddTradeDialogProps = {
    dispatchClose: () => void
}

const AddTradeDialog:FC<AddTradeDialogProps> = ({dispatchClose}) => {

    const [formData, setFormData] = useState<FormData>({
        symbol: '',
        sl: '',
        tp: '',
        positions: [{
            type: 'long',
            datetime: undefined,
            quantity: undefined,
            price: undefined,
            fee: undefined
        },{
            type: 'short',
            datetime: undefined,
            quantity: undefined,
            price: undefined,
            fee: undefined
        }]
    });

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
                type: position.type === 'long' ? 'short' : 'long'
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
            type: "long",
            datetime: undefined,
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
        console.log(formData);
    }

    return <Dialog onClick={() => dispatchClose()}>
        <form onSubmit={handleSubmit}>
            <Title>New Trade</Title>
            <MainInfoGrid>
                <label htmlFor="sl">Stop Loss</label>
                <label htmlFor="symbol">Token</label>
                <label htmlFor="tp">TakeProfit</label>
                <input id="symbol" name="symbol" value={formData.symbol} onChange={handleChange} placeholder="Eg. btc, etg, link, avax..." required/>
                <input id="sl" name="sl" value={formData.sl} onChange={handleChange} placeholder="Eg. 21.3456"/>
                <input id="tp" name="tp" value={formData.tp} onChange={handleChange} placeholder="Eg. 22.3456"/>
            </MainInfoGrid>
            <PositionsGrid>
                <div>Position Type</div>
                <div>Date/Time</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Fee</div>

                {formData.positions.map((item, index) => (
                    <PositionItemRow key={index}>
                        <div>
                            <button type="button" onClick={() => handleRemovePositionClick(index)}>x</button>
                            <button type="button" onClick={() => handlePositionItemTypeChange(index)}>{item.type === "long" ? "Buy/Long" : "Sell/Short"}</button>
                        </div>
                        <input name="datetime" value={formData.positions[index].datetime} onChange={e => handlePositionItemChange(index, e.target.name, e.target.value)} placeholder="Eg. 06/16/2022 01:01 PM"/>
                        <input name="quantity" value={formData.positions[index].quantity} onChange={e => handlePositionItemChange(index, e.target.name, e.target.value)} placeholder="Eg. 3.21"/>
                        <input name="price" value={formData.positions[index].price} onChange={e => handlePositionItemChange(index, e.target.name, e.target.value)} placeholder="Eg. 123.02"/>
                        <input name="fee" value={formData.positions[index].fee} onChange={e => handlePositionItemChange(index, e.target.name, e.target.value)} placeholder="Eg. 0.05"/>
                    </PositionItemRow>
                ))}

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