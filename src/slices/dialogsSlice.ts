import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DialogName = 'add' | 'edit';

export type Dialogs = {
    add:boolean,
    edit:boolean,
}

export type DialogPayload = {
    dialogName: DialogName,
    isVisible: boolean
}

const initialState:Dialogs = {
    add:false,
    edit:false
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