// @TODO move tokenSymbolAliases to siteConfig.js

const tokenSymbolAliases = {
  "yDAI+yUSDC+yUSDT+yTUSD": "yCRV",
  "vcDAI+cUSDC": "cDAI+cUSDC",
  crvRenWSBTC: "crvBTC",
  "yDAI+yUSDC+yUSDT+yBUSD": "crvBUSD",
};

function getTokenSymbolAlias(symbol) {
  return tokenSymbolAliases[symbol] ?? symbol;
}

export default getTokenSymbolAlias;
