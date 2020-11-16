import StrategyLink from "components/vaultsReport/vaultOverview/strategyLink";
import VaultLink from "components/vaultsReport/vaultOverview/vaultLink";

function VaultOverview({ vault }) {
  return (
    <>
      <VaultLink address={vault.address} linkText={vault.vaultAlias} titleText={vault.name} />
      <StrategyLink address={vault.strategyAddress} linkText={vault.strategyName} />
    </>
  );
}

export default VaultOverview;
