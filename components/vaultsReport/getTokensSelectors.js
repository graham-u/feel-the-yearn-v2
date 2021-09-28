/* These selectors were extracted to this file to avoid a circular dependency */

import createCachedSelector from "re-reselect";

const getAllTokens = (state) => state.vaultsReport.underlyingTokens.data;

const getToken = createCachedSelector(
  getAllTokens,
  (state, tokenAddress) => tokenAddress,
  (allTokens, tokenAddress) => {
    return allTokens[tokenAddress];
  }
)((state, tokenAddress) => tokenAddress);

export { getAllTokens, getToken };
