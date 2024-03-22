import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DialogName = 'trade';

export type Dialogs = {
    trade:boolean,
}

export type DialogPayload = {
    dialogName: DialogName,
    isVisible: boolean
}

const initialState:Dialogs = {
    trade:false,
}

const dialogsSlice = createSlice({
    name:'dialogs',
    initialState,
    reducers: {
        setDialogIsVisible: (state, action:PayloadAction<DialogPayload>) => {
            const {dialogName, isVisible} = action.payload;
            state[dialogName] = isVisible;
        }
    }
});

export const { setDialogIsVisible } = dialogsSlice.actions;
export default dialogsSlice.reducer;