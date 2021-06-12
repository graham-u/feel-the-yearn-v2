import { useAddress } from "components/connectionProvider/hooks";
import { getReportVaults } from "components/vaultsReport/selectors";
import Vault from "components/vaultsReport/vault";
import { isEmpty, map } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./slice";

function VaultsReport() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchVaults());
    dispatch(actions.fetchUnderlyingTokens());
    dispatch(actions.fetchStrategies());
  }, []);

  const userAddress = useAddress();
  useEffect(() => {
    if (!isEmpty(userAddress)) {
      dispatch(actions.fetchUserPositions({ userAddress }));
    }
  }, [userAddress]);

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
