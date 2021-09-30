import { getAllTokens } from "components/vaultsReport/getTokensSelectors";
import { getVault } from "components/vaultsReport/getVaultSelector";
import { mapValues, isNumber } from "lodash";
import createCachedSelector from "re-reselect";

const getUserAllEarnings = (state) => {
  const allEarnings = mapValues(
    state.vaultsReport.userEarnings.data.earningsAssetData,
    (earnings) => Number(earnings.earned)
  );

  return allEarnings;
};

const getUserEarnings = createCachedSelector(
  getUserAllEarnings,
  getVault,
  getAllTokens,
  (state, vaultAddress) => vaultAddress,
  (userEarnings, vault, allTokens, vaultAddress) => {
    let earnings = { tokenEarnings: 0, usdcEarnings: 0 };

    const userHasEarnings = isNumber(userEarnings[vaultAddress]);
    if (userHasEarnings) {
      earnings.usdcEarnings = userEarnings[vaultAddress] / 10 ** 6;

      const tokenUsdcPrice = allTokens[vault.token].priceUsdc / 10 ** 6;
      earnings.tokenEarnings = earnings.usdcEarnings / tokenUsdcPrice;
    }

    return earnings;
  }
)((state, vaultAddress) => vaultAddress);

export { getUserAllEarnings, getUserEarnings };
