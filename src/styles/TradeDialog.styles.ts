import styled from "styled-components";

export const Dialog = styled.div`
    background-color: ${props => props.theme.secondaryBackground};
    border-radius: 40px;
    width: 938px;
`

export const Title = styled.div`
    box-sizing: border-box;
    height: 90px;
    padding: 28px 0 28px 50px;
    background-color: ${props => props.theme.primaryBackground};
    border-bottom: 2px solid ${props => props.theme.border};
    border-radius: 20px 20px 0 0;
    font-size: 1.4rem;
    font-weight: 700;
`

export const Content = styled.div`
    margin: 30px;
`

export const Label = styled.div<{$span?:number}>`
    color: ${props => props.theme.label};
    padding: 10px 0;
    grid-column: span ${props => props.$span || 1};
`

export const Input = styled.input`
    box-sizing: border-box;
    background-color: ${props => props.theme.primaryBackground};
    color: ${props => props.theme.default};
    font-size: 1.1rem;
    height: 62px;
    padding: 0 22px;
    border-radius: 20px;
    text-transform: uppercase;
    
    &::placeholder {
        color: ${props => props.theme.label};
    }
`

export const ClosePositionButton = styled.button`
    width: 12px;
    height: 12px;
    background-color: transparent;
    stroke: ${props => props.theme.icons};
    cursor: pointer;

    svg {
        width: 12px;
        height: 12px;
    }

    &:hover {
        stroke: ${props => props.theme.hover};
    }
`

export const TypePositionButton = styled.button<{$state:'buy' | 'sell'}>`
    height: 62px;
    border-radius: 20px;
    cursor: pointer;

    background-color: ${props => props.$state === 'buy'
        ? props.theme.winBackground
        : props.theme.lossBackground};

    color: ${props => props.$state === 'buy'
        ? props.theme.winFont
        : props.theme.lossFont};
`

export const MainInfoGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-column-gap: 15px;
    margin-bottom: 43px;
`

export const PositionsGrid = styled.div`
    display: grid;
    grid-template-columns: 12px 126px 264px 143px 135px 113px;
    grid-gap: 10px 15px;
    align-items: center;
    justify-content: center;
    margin-bottom: 58px;
`

export const PositionItemRow = styled.div`
    display: contents;
`

export const AddPositionItemRow = styled.div`
    display: contents;

    & > button {
        grid-column: 2 / span 1;
    }

    & > div {
        grid-column: 3 / span 4;
    }
`

export const AddPositionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 62px;
    background-color: transparent;
    border: 2px dashed ${props => props.theme.skeleton};
    border-radius: 20px;
    stroke: ${props => props.theme.skeleton};
    font-style: italic;
    cursor: pointer;

    svg {
        width: 26px;
        height: 26px;
    }

    &:hover {
        stroke: ${props => props.theme.hover};
        border: 2px dashed ${props => props.theme.hover};
    }
`

export const AddPositionHint = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 62px;
    background-color: transparent;
    border: 2px dashed ${props => props.theme.skeleton};
    border-radius: 20px;
    font-style: italic;
    color: ${props => props.theme.skeleton};
`

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const EmptyButton = styled.div`
    width:180px;
`

export const DeleteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 50px;
    background-color: ${props => props.theme.dangerAction};
    border-radius: 20px;
    color: ${props => props.theme.lossFont};
    cursor: pointer;
`

export const SaveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 355px;
    height: 62px;
    background-color: ${props => props.theme.action};
    border-radius: 20px;
    font-size: 1.25rem;
    color: ${props => props.theme.default};
    cursor: pointer;
`