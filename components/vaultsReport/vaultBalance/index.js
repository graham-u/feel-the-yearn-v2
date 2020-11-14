import AnimatedTicker from "components/vaultsReport/animatedTicker/AnimatedTicker";
import ContractData from "components/vaultsReport/contractData";
import normalizedValue from "utils/normalizedValue";
import holdingsFormatterFactory from "utils/holdingsFormatterFactory";
import { pure } from "recompose";

function VaultBalance({ vault }) {
  const { address, decimals } = vault;
  return (
    <ContractData
      contractConfigs={[
        {
          contractKey: address,
          method: "balance",
        },
      ]}
      render={(rawBalance) => {
        return (
          <AnimatedTicker
            value={normalizedValue(rawBalance, decimals)}
            formatter={holdingsFormatterFactory()}
          />
        );
      }}
    />
  );
}

export default pure(VaultBalance);
