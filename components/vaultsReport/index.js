import { getReportVaults } from "components/vaultsReport/selectors";
import Vault from "components/vaultsReport/vault";
import { map } from "lodash";
import { useSelector } from "react-redux";

function VaultsReport() {
  const reportVaultAddresses = map(useSelector(getReportVaults), (vault) => vault.address);

  return (
    <>
      {reportVaultAddresses.map((vaultAddress) => (
        <Vault key={vaultAddress} vaultAddress={vaultAddress} />
      ))}
    </>
  );
}

export default VaultsReport;
