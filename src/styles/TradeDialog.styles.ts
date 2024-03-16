import styled from "styled-components";

export const Dialog = styled.div`
    background-color: gray;
    width: 1000px;
    height: 700px;
    padding: 10px;
`

export const Title = styled.div`
    font-size: 1.5rem;
`

export const MainInfoGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 10px;
`

export const PositionsGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-column-gap: 10px;
`

export const PositionItemRow = styled.div`
    display: contents;
`

export const AddPositionItemRow = styled.div`
    display: contents;

    & > div {
        grid-column: 2 / span 4;
    }
`