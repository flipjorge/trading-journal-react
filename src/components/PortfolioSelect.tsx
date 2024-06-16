import * as Select from "@radix-ui/react-select";
import * as Styles from "../styles/PortfolioSelect.styles";
import SelectArrowIcon from '../assets/select-arrow-icon.svg?react';

export const PortfolioSelect = () => {

    return (
        <Select.Root>
            <Styles.Trigger>
                <Select.Value placeholder="Select Portfolio"/>
                <Styles.Icon>
                    <SelectArrowIcon/>
                </Styles.Icon>
            </Styles.Trigger>

            <Select.Portal>
                <Styles.Content position="popper">
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                        <Styles.Item value="Portfolio 1">
                            <Select.ItemText>Portfolio 1</Select.ItemText>
                        </Styles.Item>
                        <Styles.Item value="Portfolio 2">
                            <Select.ItemText>Portfolio 2</Select.ItemText>
                        </Styles.Item>
                        <Styles.Item value="Portfolio 3">
                            <Select.ItemText>Portfolio 3</Select.ItemText>
                        </Styles.Item>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                    <Select.Arrow />
                </Styles.Content>
            </Select.Portal>
        </Select.Root>
    )
}