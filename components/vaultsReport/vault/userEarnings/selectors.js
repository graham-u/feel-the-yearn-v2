import { getVault } from "components/vaultsReport/selectors";
import { mapValues } from "lodash";
import createCachedSelector from "re-reselect";
import normalizedValue from "utils/normalizedValue";

const getUserAllEarnings = (state) => {
  const allEarnings = mapValues(state.vaultsReport.userPositions.data, (position) => {
    return mapValues(position.earnings, (earned) => Number(earned));
  });

  return allEarnings;
};

const getUserEarnings = createCachedSelector(
  getUserAllEarnings,
  getVault,
  (state, vaultAddress) => vaultAddress,
  (userEarnings, vault, vaultAddress) => {
    const defaultEarnings = { amount: 0, amountUsdc: 0 };
    let vaultEarnings = userEarnings[vaultAddress] || defaultEarnings;

    vaultEarnings.amount = normalizedValue(vaultEarnings.amount, vault.decimals);
    vaultEarnings.amountUsdc = normalizedValue(vaultEarnings.amountUsdc, 6);

    return vaultEarnings;
  }
)((state, vaultAddress) => vaultAddress);

export { getUserAllEarnings, getUserEarnings };
