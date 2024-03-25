import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Position } from "../models/tradeModels";
import { dummyPositionsData } from "../data/dummyPositionsData";

const positionsSlice = createSlice({
    name:'positions',
    initialState: dummyPositionsData,
    reducers: {
        addPosition: (state:Position[], action:PayloadAction<Position>) => {
            state.push(action.payload);
        },
        addPositions: (state:Position[], action:PayloadAction<Position[]>) => {
            state.push(...action.payload);
        },
        updatePosition: (state:Position[], action:PayloadAction<Position>) => {
            const index = state.findIndex(position => position.id === action.payload.id);
            if(index !== -1) {
                state[index] = action.payload;
            }
        },
        updatePositions: (state:Position[], action:PayloadAction<Position[]>) => {
            action.payload.forEach(actionPosition => {
                const index = state.findIndex(statePosition => statePosition.id === actionPosition.id);
                if(index !== -1) {
                    state[index] = actionPosition;
                }
            });
        },
        setPositionsForTrade: (state:Position[], action:PayloadAction<{tradeId:string, positions:Position[]}>) => {
            
            const tradePositions = state.filter(statePosition => statePosition.tradeId === action.payload.tradeId);

            //delete from state transactions not presented in action payload
            tradePositions.forEach(tradePosition => {
                const found = action.payload.positions.find(actionPosition => actionPosition.id === tradePosition.id);
                if(!found) {
                    const index = state.findIndex(statePosition => statePosition.id === tradePosition.id);    
                    if(index !== -1) {
                        state.splice(index);
                    }
                }
            });

            action.payload.positions.forEach(actionPosition => {
                const index = state.findIndex(statePosition => statePosition.id === actionPosition.id);
                if(index !== -1) {
                    //update position
                    state[index] = actionPosition;
                } else {
                    //add position if its new
                    state.push(actionPosition);
                }
            });
        },
        removePosition: (state:Position[], action:PayloadAction<string>) => {
            const index = state.findIndex(position => position.id === action.payload);
            if(index !== -1) {
                state.splice(index, 1);
            }
        },
        removePositionsByTradeId: (state:Position[], action:PayloadAction<string>) => {
            console.log(state.length);
            state.forEach(() => {
                const index = state.findIndex(position => position.tradeId === action.payload);
                if(index !== -1) {
                    state.splice(index, 1);
                }
            })
        }
    }
});

export const { addPosition: addPosition, addPositions, updatePosition, updatePositions, 
    setPositionsForTrade, removePosition, removePositionsByTradeId } = positionsSlice.actions;
export default positionsSlice.reducer;