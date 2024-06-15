import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.secondaryBackground};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    height: 116px;
    padding: 0 20px 0 30px;
`

export const ItemsContainer = styled.div`
    display: flex;
    gap: 60px;
`

export const Item = styled.div`
    display: flex;
    flex-direction: column;
`

export const ItemLabel = styled.div`
    color: ${props => props.theme.label};
`

export const ItemValue = styled.div`
    font-size: 2.2rem;
    font-weight: 600;
`