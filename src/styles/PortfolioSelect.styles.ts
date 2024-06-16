import * as Select from "@radix-ui/react-select"
import styled from "styled-components";

export const Trigger = styled(Select.Trigger)`
    all: unset;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: 1.5px solid ${props => props.theme.border};
    border-radius: 15px;
    padding: 0 24px;
    gap: 24px;
    height: 60px;
    max-width: 350px;
    
    &:hover, &:focus {
        background-color: ${props => props.theme.hoverBackground};
        border-color: ${props => props.theme.hover};
    };
`

export const Content = styled(Select.Content)`
    background-color: ${props => props.theme.secondaryBackground};
    border: 1.5px solid ${props => props.theme.border};
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;

    width: var(--radix-select-trigger-width);
    max-height: var(--radix-select-content-available-height);
`

export const Item = styled(Select.Item)`
    color:white;
    padding: 12px 21px;
    border: 1.5px solid transparent;

    &:first-child {
        border-radius: 15px 15px 0 0;
    }

    &:last-child {
        border-radius: 0 0 15px 15px;
    }

    &[data-highlighted] {
        background-color: ${props => props.theme.hoverBackground};
        border-color: ${props => props.theme.hover};
        outline: none;
    };
`

export const ManagePortfolioItem = styled.div`
    color:white;
    padding: 12px 21px;
    border: 1.5px solid transparent;

    &:last-child {
        border-radius: 0 0 15px 15px;
    }

    &:hover {
        background-color: ${props => props.theme.hoverBackground};
        border-color: ${props => props.theme.hover};
        outline: none;
    }
`

export const Icon = styled(Select.Icon)`
    stroke: white;

    svg {
        width: 16px;
        height: 10px;
    }
`