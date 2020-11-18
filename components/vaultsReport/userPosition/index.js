import { Typography } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { useAddress } from "components/connectionProvider/hooks";
import ContractData from "components/vaultsReport/contractData";
import TokenAndFiatBalance from "components/vaultsReport/tokenAndFiatBalance";
import normalizedValue from "utils/normalizedValue";

function UserPosition({ vault }) {
  const { address: vaultAddress, tokenAddress } = vault;

  const userAddress = useAddress();

  const contractConfigs = [
    {
      contractKey: vaultAddress,
      method: "balanceOf",
      methodArgs: [userAddress],
    },
    {
      contractKey: vaultAddress,
      method: "getPricePerFullShare",
    },
  ];

  return (
    <>
      <Hidden lgUp>
        <Typography gutterBottom>User holdings</Typography>
      </Hidden>
      <ContractData
        contractConfigs={contractConfigs}
        render={(rawYTokenBalance, sharePrice) => {
          const rawTokenBalance = Number(rawYTokenBalance * normalizedValue(sharePrice, 18));

          return (
            <TokenAndFiatBalance
              rawBalance={rawTokenBalance}
              tokenAddress={tokenAddress}
              tokenDisplayPrecision={4}
              fiatMinShow={0.01}
              tokenMinShow={0.00001}
            />
          );
        }}
      />
    </>
  );
}

export default UserPosition;
