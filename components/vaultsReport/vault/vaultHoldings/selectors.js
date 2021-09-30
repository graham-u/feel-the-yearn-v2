import { getVault } from "components/vaultsReport/getVaultSelector";
import createCachedSelector from "re-reselect";
import normalizedValue from "utils/normalizedValue";
import { pick } from "lodash";

const getVaultBalance = createCachedSelector(getVault, (vault) => {
  // vault.underlyingTokenBalance properties are set as unwriteable and uncustomiseable and
  // copying them preserves this.  As we want to normalize these values we pick them off instead
  // of directly assigning the properties.
  let balance = pick(vault.underlyingTokenBalance, ["amount", "amountUsdc"]);
  balance.amount = normalizedValue(balance.amount, vault.decimals);
  balance.amountUsdc = normalizedValue(balance.amountUsdc, 6);

  return balance;
})((state, vaultAddress) => vaultAddress);

export { getVaultBalance };
