import styled from "styled-components";

export const Cell = styled.div`
    display: flex;
    align-items: center;
    height: 86px;
    padding: 26px 4px;
    background-color: ${props => props.theme.secondaryBackground};
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &:first-child {
        border-left: 3px solid transparent;
        border-radius: 10px 0 0 10px;
        padding-left: 33px;
    }

    &:last-child {
        border-right: 3px solid transparent;
        border-radius: 0 10px 10px 0;
    }
`

export const Row = styled.div`
    display: contents;
    cursor: pointer;

    &:hover ${Cell} {
        background-color: ${props => props.theme.hoverBackground};
        border-top: 3px solid ${props => props.theme.hover};
        border-bottom: 3px solid ${props => props.theme.hover};
    }

    &:hover ${Cell}:first-child {
        border-left: 3px solid ${props => props.theme.hover};
    }

    &:hover ${Cell}:last-child {
        border-right: 3px solid ${props => props.theme.hover};
    }
`

export const StatusField = styled.div<{$state:'win' | 'loss' | null}>`
    background-color: ${props => {
        switch(props.$state)
        {
            case "win":
                return props.theme.winBackground;
            case "loss":
                return props.theme.lossBackground;
            default:
                return 'transparent';
        }
    }};
    color: ${props => {
        switch(props.$state)
        {
            case "win":
                return props.theme.winFont;
            case "loss":
                return props.theme.lossFont;
            case null:
                return props.theme.default;
        }
    }};

    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 33px;
    border-radius: 7px;
`

export const SideField = styled.div<{$side:'long' | 'short' | null}>`
    stroke: ${props => {
        switch(props.$side)
        {
            case 'long':
                return props.theme.winFont;
            case 'short':
                return props.theme.lossFont;
            default:
                return props.theme.default;
        }
    }};

    transform: rotate(${props => {
        switch(props.$side)
        {
            case 'long':
                return -45;
            case 'short':
                return 45;
            default:
                return 0;
        }
    }}deg);

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        width: 15px;
        height: 15px;
    }
`