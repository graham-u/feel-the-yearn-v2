import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ContractData from "components/vaultsReport/contractData";
import TokenAndFiatBalance from "components/vaultsReport/tokenAndFiatBalance";

function StrategyHoldings({ vault }) {
  const { strategyAddress } = vault;

  const contractConfigs = [
    {
      contractKey: strategyAddress,
      method: "balanceOf",
    },
    {
      contractKey: strategyAddress,
      method: "want",
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>Strategy holdings</Typography>
        <ContractData
          contractConfigs={contractConfigs}
          render={(rawBalance, wantTokenAddress) => {
            return <TokenAndFiatBalance rawBalance={rawBalance} tokenAddress={wantTokenAddress} />;
          }}
        />
      </CardContent>
    </Card>
  );
}

export default StrategyHoldings;
