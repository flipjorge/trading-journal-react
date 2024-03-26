import styled from "styled-components";

export const Row = styled.div`
    display: contents;
    cursor: pointer;
`

export const Cell = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 86px;
    padding: 26px 4px;
    background-color: ${props => props.theme.secondaryBackground};

    &:first-child {
        border-radius: 10px 0 0 10px;
        padding-left: 36px;
    }

    &:last-child {
        border-radius: 0 10px 10px 0;
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