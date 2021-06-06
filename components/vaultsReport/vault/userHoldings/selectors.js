import { getVault } from "components/vaultsReport/selectors";
import { mapValues } from "lodash";
import createCachedSelector from "re-reselect";
import normalizedValue from "utils/normalizedValue";

const getUserBalances = (state) => {
  const balances = mapValues(state.vaultsReport.userPositions.data, (position) => {
    return mapValues(position.balance, (balance) => Number(balance));
  });

  return balances;
};

const getUserBalance = createCachedSelector(
  getUserBalances,
  getVault,
  (state, vaultAddress) => vaultAddress,
  (userBalances, vault, vaultAddress) => {
    const defaultBalances = { amount: 0, amountUsdc: 0 };
    let balance = userBalances[vaultAddress] || defaultBalances;

    balance.amount = normalizedValue(balance.amount, vault.decimals);
    balance.amountUsdc = normalizedValue(balance.amountUsdc, 6);

    return balance;
  }
)((state, vaultAddress) => vaultAddress);

export { getUserBalances, getUserBalance };
