import { useAddress } from "components/connectionProvider/hooks";
import { getSortedVaultAddresses } from "components/vaultsReport/sortedVaultAddressSelectors";
import Vault from "components/vaultsReport/vault";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./slice";

function VaultsReport() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchVaults());
    dispatch(actions.fetchTokens());
  }, []);

  const userAddress = useAddress();
  useEffect(() => {
    if (!isEmpty(userAddress)) {
      dispatch(actions.fetchUserPositions({ userAddress }));
    }
  }, [userAddress]);

  const sortedVaultAddresses = useSelector(getSortedVaultAddresses);

  return (
    <>
      {sortedVaultAddresses.map((vaultAddress) => (
        <Vault key={vaultAddress} vaultAddress={vaultAddress} />
      ))}
    </>
  );
}

export default VaultsReport;
