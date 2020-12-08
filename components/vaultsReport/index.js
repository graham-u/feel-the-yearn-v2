import { useWeb3, useAddress } from "components/connectionProvider/hooks";
import { getDrizzleInitialized } from "components/drizzleCreator/selectors";
import { getLocalCurrency } from "components/pageContainer/header/settingsPanel/selectors";
import { getVaultRegistryLoaded, getAllVaults } from "components/vaultsReport/selectors";
import {
  initializeContractData,
  setPriceFetchInterval,
  setUserStatsFetchInterval,
} from "components/vaultsReport/setup";
import { getSortedVaultAddresses } from "components/vaultsReport/sortedVaultAddressSelectors";
import Vault from "components/vaultsReport/vault";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./slice";

function VaultsReport() {
  const dispatch = useDispatch();
  const web3 = useWeb3();
  const drizzleInitialized = useSelector(getDrizzleInitialized);

  const localCurrency = useSelector(getLocalCurrency);

  useEffect(() => {
    dispatch(actions.fetchVaults());
  }, []);

  useEffect(() => {
    dispatch(actions.fetchVaultsApy());
  }, []);

  const allVaults = useSelector(getAllVaults);

  useEffect(() => {
    if (!isEmpty(allVaults)) {
      const interval = setPriceFetchInterval(allVaults, localCurrency, dispatch);
      return () => clearInterval(interval);
    }
  }, [allVaults, localCurrency]);

  const userAddress = useAddress();
  useEffect(() => {
    if (!isEmpty(userAddress)) {
      const interval = setUserStatsFetchInterval(userAddress, dispatch);
      return () => clearInterval(interval);
    }
  }, [userAddress]);

  // Initialize contract data.  We only want to do this once, after vaults have loaded and drizzle
  // is initialized
  const vaultRegistryLoaded = useSelector(getVaultRegistryLoaded);
  useEffect(() => {
    if (drizzleInitialized && vaultRegistryLoaded) {
      initializeContractData(allVaults, web3, userAddress, dispatch);
    }
  }, [drizzleInitialized, vaultRegistryLoaded]);

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
