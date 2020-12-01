import { tokenSymbolAliases } from "siteConfig";

function getTokenSymbolAlias(symbol) {
  return tokenSymbolAliases[symbol] ?? symbol;
}

export default getTokenSymbolAlias;
