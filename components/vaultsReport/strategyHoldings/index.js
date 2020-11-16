import { Typography } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
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
    <>
      <Hidden lgUp>
        <Typography gutterBottom>Strategy holdings</Typography>
      </Hidden>
      <ContractData
        contractConfigs={contractConfigs}
        render={(rawBalance, wantTokenAddress) => {
          return <TokenAndFiatBalance rawBalance={rawBalance} tokenAddress={wantTokenAddress} />;
        }}
      />
    </>
  );
}

export default StrategyHoldings;
