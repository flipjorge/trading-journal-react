import * as Select from "@radix-ui/react-select";
import * as Styles from "../styles/PortfolioSelect.styles";
import SelectArrowIcon from '../assets/select-arrow-icon.svg?react';
import { useGetSelectedPortfolio } from "../hooks/selectedPortfolioHooks";
import { useGetAllPortfolios } from "../hooks/portfolioHooks";
import { useState } from "react";

export const PortfolioSelect = () => {

    const portfolios = useGetAllPortfolios();
    const selectedPortfolio = useGetSelectedPortfolio();

    const [isSelectOpen, setSelectOpen] = useState(false);

    const handleManagePortfoliosClick = () => {
        //handle open portfolio management page
        setSelectOpen(false);
    }

    return (
        <Select.Root open={isSelectOpen} onOpenChange={setSelectOpen}>
            <Styles.Trigger>
                <Select.Value placeholder={selectedPortfolio.name}>
                </Select.Value>
                <Styles.Icon>
                    <SelectArrowIcon/>
                </Styles.Icon>
            </Styles.Trigger>

            <Select.Portal>
                <Styles.Content position="popper">
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                        {portfolios.map(portfolio => (
                            <Styles.Item key={portfolio.id} value={portfolio.id}>
                                <Select.ItemText>{portfolio.name}</Select.ItemText>
                            </Styles.Item>
                        ))}
                        <Styles.ManagePortfolioItem onClick={handleManagePortfoliosClick}>
                            Manage Portfolios
                        </Styles.ManagePortfolioItem>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                    <Select.Arrow />
                </Styles.Content>
            </Select.Portal>
        </Select.Root>
    )
}