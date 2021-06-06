import createCachedSelector from "re-reselect";

const getAllVaults = (state) => state.vaultsReport.vaults.data;

const getVault = createCachedSelector(
  getAllVaults,
  (state, vaultAddress) => vaultAddress,
  (allVaults, vaultAddress) => {
    return allVaults[vaultAddress];
  }
)((state, vaultAddress) => vaultAddress);

const getAllTokens = (state) => state.vaultsReport.tokens.data;

const getToken = createCachedSelector(
  getAllTokens,
  (state, tokenAddress) => tokenAddress,
  (allTokens, tokenAddress) => {
    return allTokens[tokenAddress];
  }
)((state, tokenAddress) => tokenAddress);

const getVaultIcon = createCachedSelector(getToken, (token) => {
  return token?.icon;
})((state, tokenAddress) => tokenAddress);

const getVaultUnderlyingToken = createCachedSelector(getVault, getAllTokens, (vault, allTokens) => {
  return allTokens[vault.token];
})((state, vaultAddress) => vaultAddress);

export { getAllVaults, getVault, getVaultIcon, getVaultUnderlyingToken };
