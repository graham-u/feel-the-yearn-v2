import { mapValues } from "lodash";
import createCachedSelector from "re-reselect";

const getUserBalances = (state) => {
  const holdings = state.vaultsReport.userHoldings.data;

  const balances = mapValues(holdings, (position) => {
    return {
      balance: Number(position.amount),
      balanceUsdc: Number(position.amountUsdc),
    };
  });

  return balances;
};

const getUserBalance = createCachedSelector(
  getUserBalances,
  (state, vaultAddress) => vaultAddress,
  (userBalances, vaultAddress) => userBalances[vaultAddress] || { balance: 0, balanceUsdc: 0 }
)((state, vaultAddress) => vaultAddress);

export { getUserBalances, getUserBalance };
