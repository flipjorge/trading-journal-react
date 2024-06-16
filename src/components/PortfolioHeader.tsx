import { usePortfolioBalance } from "../hooks/portfolioHooks";
import { useGetSelectedPortfolio } from "../hooks/selectedPortfolioHooks";
import * as Styles from "../styles/PortfolioHeader.styles";
import { convertNumberToCurrency } from "../utils/formatUtils";

export const PortfolioHeader = () => {

    const portfolio = useGetSelectedPortfolio();
    const portfolioBalance = usePortfolioBalance(portfolio.id);

    return (
        <Styles.Container>
            <Styles.ItemsContainer>
                <Styles.Item>
                    <Styles.ItemLabel>
                        Account Balance
                    </Styles.ItemLabel>
                    <Styles.ItemValue>
                        {convertNumberToCurrency({
                            value: portfolioBalance
                        })}
                    </Styles.ItemValue>
                </Styles.Item>
                <Styles.Item>
                    <Styles.ItemLabel>
                        Winrate
                    </Styles.ItemLabel>
                    <Styles.ItemValue>
                        66%
                    </Styles.ItemValue>
                </Styles.Item>
            </Styles.ItemsContainer>
        </Styles.Container>
    )
}