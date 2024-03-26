import { useMemo } from "react";
import { useAddTrade, useDeleteTrade, useEditTrade } from "../hooks/tradeHooks";
import { Trade, Position } from "../models/tradeModels";
import * as Styles from '../styles/TradeDialog.styles';
import { useGenerateUUID } from "../hooks/uuidHooks";
import { useGetPositionsByTradeId, useRemovePositionsByTradeId, useSetPositionsForTrade } from "../hooks/positionHooks";
import { useClearSelectedTrade, useGetSelectedTrade } from "../hooks/selectedTradeHooks";
import { convertDateToInputFormat } from "../utils/dateTimeUtils";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { useCloseDialog } from "../hooks/dialogHooks";
import AddIcon from "../assets/add-icon-no-border.svg?react";
import RemoveIcon from "../assets/remove-icon.svg?react";

type FormData = {
    id:string,
    symbol:string,
    sl:number | undefined,
    tp:number | undefined,
    positions:FormPositionItem[]
}

type FormPositionItem = {
    id:string,
    type: 'buy' | 'sell',
    datetime:string | undefined,
    quantity:number | undefined,
    price:number | undefined,
    fee:number | undefined
}

const defaultPosition:FormPositionItem = {
    id:'',
    type: "buy",
    datetime: undefined,
    price: undefined,
    quantity: undefined,
    fee: undefined
}

const TradeDialog = () => {

    const dispatchAddTrade = useAddTrade();
    const dispatchEditTrade = useEditTrade();
    const dispatchDeleteTrade = useDeleteTrade();
    const dispatchSetPositions = useSetPositionsForTrade();
    const dispatchDeletePositionsById = useRemovePositionsByTradeId();
    const dispatchClearSelectedTrade = useClearSelectedTrade();
    const dispatchCloseTradeDialog = useCloseDialog('trade');
    const generateTradeId = useGenerateUUID();

    const trade = useGetSelectedTrade();
    const positions = useGetPositionsByTradeId(trade?.id || '');

    const formPositions = useMemo<FormPositionItem[]>(() => {
        if(trade) {
            return positions.map(position => ({
                id: position.id,
                tradeId: position.tradeId,
                type: position.action,
                datetime: position.datetime,
                quantity: position.quantity,
                price: position.price,
                fee: position.fee
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
    }, [trade, positions, generateTradeId]);

    const { register, control, handleSubmit, getValues, setValue, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            id: trade?.id || generateTradeId(),
            symbol: trade?.symbol || '',
            sl: trade?.sl || undefined,
            tp: trade?.tp || undefined,
            positions: formPositions
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
        
        const positions = convertFormDataToPositions(data, updatedTrade.id);
        console.log(positions);
        dispatchSetPositions(updatedTrade.id, positions);
        
        dispatchClearSelectedTrade();
        dispatchCloseTradeDialog();
    }

    const handleDelete = () => {

        if(!trade) return;

        dispatchDeleteTrade(trade);
        dispatchDeletePositionsById(trade.id);
        
        dispatchClearSelectedTrade();
        dispatchCloseTradeDialog();
    }

    const convertFormDataToTrade = (data:FormData) => {
        
        const updatedTrade:Trade = {
            id:data.id,
            symbol:data.symbol,
            sl:data.sl,
            tp:data.tp
        }

        return updatedTrade;
    }

    const convertFormDataToPositions = (data:FormData, tradeId:string) => {

        const positions:Position[] = data.positions.map((formPosition) => {
            
            const date = formPosition.datetime ? new Date(formPosition.datetime) : new Date();
            const position:Position = {
                id:formPosition.id,
                tradeId:tradeId,
                action:formPosition.type,
                datetime:convertDateToInputFormat(date),
                price:Number(formPosition.price),
                quantity:Number(formPosition.quantity),
                fee:Number(formPosition.fee)
            }

            console.log(typeof position.price);

            return position;
        });

        return positions;
    }

    return <Styles.Dialog>
        <Styles.Title>{trade ? 'Edit Trade' : 'New Trade'}</Styles.Title>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Styles.Content>
                <Styles.MainInfoGrid>
                    <Styles.Label>Token</Styles.Label>
                    <Styles.Label>Stop Loss</Styles.Label>
                    <Styles.Label>TakeProfit</Styles.Label>
                    <Styles.Input id="symbol" {...register("symbol", { required:true })}
                        placeholder="Eg. btc, etg, link, avax..."/>
                    <Styles.Input id="sl" {...register("sl")}
                        type="number"
                        placeholder="Eg. 21.3456"/>
                    <Styles.Input id="tp" {...register("tp")}
                        type="number"
                        placeholder="Eg. 22.3456"/>
                </Styles.MainInfoGrid>
                {errors.symbol && <div>Symbol is required</div>}
                <Styles.PositionsGrid>
                    <Styles.Label $span={2}>Position Type</Styles.Label>
                    <Styles.Label>Date/Time</Styles.Label>
                    <Styles.Label>Quantity</Styles.Label>
                    <Styles.Label>Price</Styles.Label>
                    <Styles.Label>Fee</Styles.Label>

                    {fields.map((item, index) => (
                    <Styles.PositionItemRow key={item.id}>
                        <Styles.ClosePositionButton type="button" onClick={() => remove(index)}><RemoveIcon/></Styles.ClosePositionButton>
                        <Styles.TypePositionButton type="button" onClick={() => handlePositionTypeToogle(index)} $state={watchedPositions[index].type}>{watchedPositions[index].type === "buy" ? "Buy/Long" : "Sell/Short"}</Styles.TypePositionButton>
                        <Styles.Input {...register(`positions.${index}.datetime`, {
                                required:true
                            })}
                            type="datetime-local"
                            placeholder="Eg. 06/16/2022 01:01 PM"
                            className={errors.positions && errors.positions[index]?.datetime ? 'invalidInput' : ''}/>
                        <Styles.Input {...register(`positions.${index}.quantity`, {
                                required:true
                            })}
                            type="number" step="any"
                            placeholder="Eg. 3.21"
                            className={errors.positions && errors.positions[index]?.quantity ? 'invalidInput' : ''}/>
                        <Styles.Input {...register(`positions.${index}.price`, {
                                required:true
                            })}
                            type="number" step="any"
                            placeholder="Eg. 123.02"
                            className={errors.positions && errors.positions[index]?.price ? 'invalidInput' : ''}/>
                        <Styles.Input {...register(`positions.${index}.fee`, {
                                required:true
                            })}
                            type="number" step="any"
                            placeholder="Eg. 0.05"
                            className={errors.positions && errors.positions[index]?.fee ? 'invalidInput' : ''}/>
                    </Styles.PositionItemRow>
                    ))}

                    <Styles.AddPositionItemRow>
                        <Styles.AddPositionButton type="button" onClick={() => append(defaultPosition)}><AddIcon/></Styles.AddPositionButton>
                        <Styles.AddPositionHint>Add accordingly if you are closing partial positions, or adding to your positions</Styles.AddPositionHint>
                    </Styles.AddPositionItemRow>
                </Styles.PositionsGrid>
                <Styles.ActionsContainer>
                    <Styles.EmptyButton/>
                    <Styles.SaveButton type="submit">Save Trade</Styles.SaveButton>
                    {trade ? <Styles.DeleteButton type="button" onClick={handleDelete}>Delete Trade</Styles.DeleteButton> : <Styles.EmptyButton/>}
                </Styles.ActionsContainer>
            </Styles.Content>
        </form>
    </Styles.Dialog>
}

export default TradeDialog;