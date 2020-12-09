const errorMessages = {
  fetchUserStatsFailure: "Failed to fetch user stats. Lifetime earnings may be missing / stale.",
  fetchVaultsFailure: "Failed to fetch vault registry data. Vaults cannot be shown.",
  fetchWantTokenPricesFailure:
    "Failed to fetch token prices. Fiat balances may be missing / stale.",
  fetchVaultsApyFailure:
    "Failed to fetch vault performance stats. Vault returns cannot currently be shown.",
};

const announcementDurationInDays = 7;

const announcements = [
  {
    id: "vaultSortingRelease",
    message: "You can now re-order vaults by any field! Configure via settings button.",
    date: "2020-12-08",
  },
];

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

export {
  errorMessages,
  fiatCurrencyCodes,
  tokenSymbolAliases,
  announcements,
  announcementDurationInDays,
};
