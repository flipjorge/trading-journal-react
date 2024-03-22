import { useMemo } from "react";
import { useAddTrade, useDeleteTrade, useEditTrade } from "../hooks/tradeHooks";
import { Trade, Transaction } from "../models/tradeModels";
import { Dialog, Title, MainInfoGrid, PositionsGrid, PositionItemRow, AddPositionItemRow } from '../styles/TradeDialog.styles';
import { useGenerateUUID } from "../hooks/uuidHooks";
import { useGetTransactionsByTradeId, useRemoveTransactionsByTradeId, useSetTransactionsForTrade } from "../hooks/transactionHooks";
import { useGetSelectedTrade } from "../hooks/selectedTradeHooks";
import { convertDateToInputFormat } from "../utils/dateTimeUtils";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"

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

const defaultPosition:FormTransactionItem = {
    id:'',
    type: "buy",
    datetime: undefined,
    price: undefined,
    quantity: undefined,
    fee: undefined
}

const TradeDialog = ({onTradeSaved, onTradeDeleted}:Props) => {

    const dispatchAddTrade = useAddTrade();
    const dispatchEditTrade = useEditTrade();
    const dispatchDeleteTrade = useDeleteTrade();
    const dispatchSetTransactions = useSetTransactionsForTrade();
    const dispatchDeleteTransactionsById = useRemoveTransactionsByTradeId();
    const generateTradeId = useGenerateUUID();

    const trade = useGetSelectedTrade();
    const transactions = useGetTransactionsByTradeId(trade?.id || '');

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

    const { register, control, handleSubmit, getValues, setValue, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            id: trade?.id || generateTradeId(),
            symbol: trade?.symbol || '',
            sl: trade?.sl || undefined,
            tp: trade?.tp || undefined,
            positions: formTransactions
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "positions"
    });

    const watchedPositions = watch("positions");

    const handlePositionTypeToogle = (index:number) => {
        const currentType = getValues(`positions.${index}.type`);
        const newType = currentType === 'buy' ? 'sell' : 'buy';

        setValue(`positions.${index}.type`, newType, {
            shouldDirty: true
        });
    }

    const handleOnSubmit: SubmitHandler<FormData> = (data) => {
        const updatedTrade = convertFormDataToTrade(data);

        if(trade){
            dispatchEditTrade(updatedTrade);
        } else {
            dispatchAddTrade(updatedTrade);
        }
        
        const transactions = convertFormDataToTransactions(data, updatedTrade.id);
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
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Title>{trade ? 'Edit Trade' : 'New Trade'}</Title>
            <MainInfoGrid>
                <label htmlFor="symbol">Token</label>
                <label htmlFor="sl">Stop Loss</label>
                <label htmlFor="tp">TakeProfit</label>
                <input id="symbol" {...register("symbol", { required:true })}
                    placeholder="Eg. btc, etg, link, avax..."/>
                <input id="sl" {...register("sl")}
                    type="number"
                    placeholder="Eg. 21.3456"/>
                <input id="tp" {...register("tp")}
                    type="number"
                    placeholder="Eg. 22.3456"/>
            </MainInfoGrid>
            {errors.symbol && <div>Symbol is required</div>}
            <PositionsGrid>
                <div>Position Type</div>
                <div>Date/Time</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Fee</div>

                {fields.map((item, index) => (
                <PositionItemRow key={item.id}>
                    <div>
                        <button type="button" onClick={() => remove(index)}>x</button>
                        <button type="button" onClick={() => handlePositionTypeToogle(index)}>{watchedPositions[index].type === "buy" ? "Buy/Long" : "Sell/Short"}</button>
                    </div>
                    <input {...register(`positions.${index}.datetime`, {
                            required:true
                        })}
                        type="datetime-local"
                        placeholder="Eg. 06/16/2022 01:01 PM"
                        className={errors.positions && errors.positions[index]?.datetime ? 'invalidInput' : ''}/>
                    <input {...register(`positions.${index}.quantity`, {
                            required:true
                        })}
                        type="number" step="any"
                        placeholder="Eg. 3.21"
                        className={errors.positions && errors.positions[index]?.quantity ? 'invalidInput' : ''}/>
                    <input {...register(`positions.${index}.price`, {
                            required:true
                        })}
                        type="number" step="any"
                        placeholder="Eg. 123.02"
                        className={errors.positions && errors.positions[index]?.price ? 'invalidInput' : ''}/>
                    <input {...register(`positions.${index}.fee`, {
                            required:true
                        })}
                        type="number" step="any"
                        placeholder="Eg. 0.05"
                        className={errors.positions && errors.positions[index]?.fee ? 'invalidInput' : ''}/>
                </PositionItemRow>
                ))}

                <AddPositionItemRow>
                    <button type="button" onClick={() => append(defaultPosition)}>+</button>
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