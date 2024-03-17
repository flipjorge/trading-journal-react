import { ReactNode, useRef } from "react";
import styled from "styled-components";
import { useCloseDialog, useGetDialogIsVisible } from "../hooks/dialogHooks";
import { DialogName } from "../slices/dialogsSlice";

const Container = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    top:0;
    z-index: 100;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.2);
    backdrop-filter: blur(2px);
`

type DialogContainerProps = {
    children: ReactNode,
    dialogName: DialogName
}

const DialogContainer = ({children, dialogName}:DialogContainerProps) => {

    const dialogState = useGetDialogIsVisible(dialogName);
    const dispatchCloseDialog = useCloseDialog(dialogName);

    const dialogRef = useRef(null);

    const handleDialogClose = (e:React.MouseEvent) => {
        if(dialogRef.current !== e.target) return;
        dispatchCloseDialog();
    }

    return <>
        {dialogState && <Container
            ref={dialogRef}
            onClick={handleDialogClose}>
            {children}
        </Container>}
    </>;
}

export default DialogContainer;