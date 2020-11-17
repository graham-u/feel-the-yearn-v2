import { Typography } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { useAddress } from "components/connectionProvider/hooks";
import ContractData from "components/vaultsReport/contractData";
import TokenAndFiatBalance from "components/vaultsReport/tokenAndFiatBalance";

function UserHoldings({ vault }) {
  const { address: vaultAddress, tokenAddress } = vault;

  const userAddress = useAddress();

  const contractConfigs = [
    {
      contractKey: vaultAddress,
      method: "balanceOf",
      methodArgs: [userAddress],
    },
  ];

  return (
    <>
      <Hidden lgUp>
        <Typography gutterBottom>User holdings</Typography>
      </Hidden>
      <ContractData
        contractConfigs={contractConfigs}
        render={(rawBalance) => {
          rawBalance = Number(rawBalance);
          return (
            <TokenAndFiatBalance
              rawBalance={rawBalance}
              tokenAddress={tokenAddress}
              fiatMinShow={0.01}
              tokenMinShow={0.00001}
            />
          );
        }}
      />
    </>
  );
}

export default UserHoldings;
