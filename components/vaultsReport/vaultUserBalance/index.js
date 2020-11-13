import ContractData from "components/vaultsReport/ContractData";
import AnimatedTicker from "components/vaultsReport/animatedTicker/AnimatedTicker";
import normalizedValue from "utils/normalizedValue";
import holdingsFormatterFactory from "utils/holdingsFormatterFactory";
import { pure } from "recompose";

function VaultUserBalance({ vault, userAddress }) {
  const { address: vaultAddress, decimals } = vault;
  return (
    <ContractData
      contractConfigs={[
        {
          contractKey: vaultAddress,
          method: "balanceOf",
          methodArgs: [userAddress],
        },
        {
          contractKey: vaultAddress,
          method: "getPricePerFullShare",
        },
      ]}
      render={(rawBalance, sharePrice) => {
        return (
          <AnimatedTicker
            value={
              normalizedValue(rawBalance, decimals) *
              normalizedValue(sharePrice, 18)
            }
            formatter={holdingsFormatterFactory({ precision: 4 })}
          />
        );
      }}
    />
  );
}

export default pure(VaultUserBalance);
