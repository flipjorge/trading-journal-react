import { useDispatch, useSelector } from "react-redux"
import { DialogName, setDialogIsVisible } from "../slices/dialogsSlice"
import { RootState } from "../store";

export const useGetDialogIsVisible = (dialogName:DialogName) => {
    const selector = useSelector((state:RootState) => state.dialogs);
    return selector[dialogName];
}

export const useOpenDialog = (dialogName:DialogName) => {
    const dispatch = useDispatch();

    return () => dispatch(setDialogIsVisible({
        dialogName, isVisible:true
    }));
}

export const useCloseDialog = (dialogName:DialogName) => {
    const dispatch = useDispatch();

    return () => dispatch(setDialogIsVisible({
        dialogName, isVisible:false
    }));
}