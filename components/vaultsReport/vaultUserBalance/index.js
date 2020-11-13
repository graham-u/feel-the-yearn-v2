import ContractData from "components/ContractData";
import AnimatedTicker from "components/vaultsReport/animatedTicker/AnimatedTicker";
import getNormalizedBalance from "utils/getNormalizedBalance";
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
      ]}
      render={(rawBalance) => {
        return (
          <AnimatedTicker
            value={getNormalizedBalance(rawBalance, decimals)}
            formatter={holdingsFormatterFactory({ precision: 4 })}
          />
        );
      }}
    />
  );
}

export default pure(VaultUserBalance);
