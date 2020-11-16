import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
    <Card>
      <CardContent>
        <Typography gutterBottom>Vault holdings</Typography>
        <ContractData
          contractConfigs={contractConfigs}
          render={(rawBalance) => {
            return <TokenAndFiatBalance rawBalance={rawBalance} tokenAddress={tokenAddress} />;
          }}
        />
      </CardContent>
    </Card>
  );
}

export default VaultHoldings;
