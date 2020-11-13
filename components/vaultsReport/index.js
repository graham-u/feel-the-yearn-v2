import v1VaultABI from "abi/v1VaultABI";
import {
  useSelectWallet,
  useWeb3,
  useAddress,
} from "components/connectionProvider/hooks";
import { getDrizzleInitialized } from "components/drizzleCreator/selectors";
import { getVaults } from "components/vaultsReport/selectors";
import VaultBalance from "components/vaultsReport/vaultBalance";
import VaultUserBalance from "components/vaultsReport/vaultUserBalance";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./slice";

function VaultsReport() {
  const dispatch = useDispatch();
  let vaults = useSelector(getVaults);
  const web3 = useWeb3();
  const address = useAddress();
  const selectWallet = useSelectWallet();
  const drizzleInitialized = useSelector(getDrizzleInitialized);
  const [contractsAddedToDrizzle, setContractsAddedToDrizzle] = useState(false);

  useEffect(() => {
    dispatch(actions.fetchVaults());
  }, []);

  useEffect(() => {
    if (drizzleInitialized && vaults) {
      vaults.forEach((vault) => {
        drizzle.addContract({
          contractName: vault.address,
          web3Contract: new web3.eth.Contract(v1VaultABI, vault.address),
        });
      });
      setContractsAddedToDrizzle(true);
    }
  }, [drizzleInitialized, vaults]);

  if (!contractsAddedToDrizzle) {
    return null;
  }

  return (
    <>
      <p>Vaults</p>
      {vaults.map((vault) => (
        <React.Fragment key={vault.address}>
          <p>Vault: {vault.vaultAlias}</p>
          <div>
            Vault balance:
            <VaultBalance vault={vault} />
          </div>

          <div>
            User balance:
            <VaultUserBalance vault={vault} userAddress={address} />
          </div>
        </React.Fragment>
      ))}
      {!drizzleInitialized && (
        <button onClick={selectWallet}>Select wallet</button>
      )}
    </>
  );
}

export default VaultsReport;
