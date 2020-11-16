import { Typography } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import ContractData from "components/vaultsReport/contractData";
import TokenAndFiatBalance from "components/vaultsReport/tokenAndFiatBalance";

function VaultHoldings({ vault }) {
  const { address: vaultAddress, tokenAddress } = vault;

  const contractConfigs = [
    {
      contractKey: vaultAddress,
      method: "balance",
    },
  ];

  return (
    <>
      <Hidden lgUp>
        <Typography gutterBottom>Vault holdings</Typography>
      </Hidden>
      <ContractData
        contractConfigs={contractConfigs}
        render={(rawBalance) => {
          return <TokenAndFiatBalance rawBalance={rawBalance} tokenAddress={tokenAddress} />;
        }}
      />
    </>
  );
}

export default VaultHoldings;
