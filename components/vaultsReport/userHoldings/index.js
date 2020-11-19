import { useAddress } from "components/connectionProvider/hooks";
import ContractData from "components/vaultsReport/contractData";
import ReportLabel from "components/vaultsReport/reportLabel";
import TokenAndFiatBalance from "components/vaultsReport/tokenAndFiatBalance";
import normalizedValue from "utils/normalizedValue";

function UserHoldings({ vault }) {
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
    <ContractData
      contractConfigs={contractConfigs}
      render={(rawYTokenBalance, sharePrice) => {
        const rawTokenBalance = Number(rawYTokenBalance * normalizedValue(sharePrice, 18));

        return (
          <>
            <ReportLabel>Your holdings</ReportLabel>
            <TokenAndFiatBalance
              rawBalance={rawTokenBalance}
              tokenAddress={tokenAddress}
              tokenDisplayPrecision={4}
              fiatMinShow={0.01}
              tokenMinShow={0.00001}
            />
          </>
        );
      }}
    />
  );
}

export default UserHoldings;
