import * as Styles from "../styles/PortfolioHeader.styles";

export const PortfolioHeader = () => {
    return (
        <Styles.Container>
            <Styles.ItemsContainer>
                <Styles.Item>
                    <Styles.ItemLabel>
                        Account Balance
                    </Styles.ItemLabel>
                    <Styles.ItemValue>
                        $4,146.50
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