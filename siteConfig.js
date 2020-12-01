const notificationMessages = {
  userStatsFetchFailed: "Failed to fetch user stats. Lifetime earnings may be missing / stale.",
  vaultRegistryFetchFailed: "Failed to fetch vault registry data. Vaults cannot be shown.",
  tokenPricesFetchFailed: "Failed to fetch token prices. Fiat balances may be missing / stale.",
  vaultApyStatsFetchFailed:
    "Failed to fetch vault performance stats. Vault returns cannot currently be shown.",
};

const fiatCurrencyCodes = [
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "EUR",
  "GBP",
  "HKD",
  "IDR",
  "INR",
  "JPY",
  "KRW",
  "RUB",
  "SGD",
  "THB",
  "TRY",
  "TWD",
  "UAH",
  "USD",
  "VND",
  "ZAR",
];

const tokenSymbolAliases = {
  "yDAI+yUSDC+yUSDT+yTUSD": "yCRV",
  "vcDAI+cUSDC": "cDAI+cUSDC",
  crvRenWSBTC: "crvBTC",
  "yDAI+yUSDC+yUSDT+yBUSD": "crvBUSD",
};

export { notificationMessages, fiatCurrencyCodes, tokenSymbolAliases };
