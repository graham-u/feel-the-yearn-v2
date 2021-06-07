const errorMessages = {
  fetchUserPositionsFailure: "Failed to fetch user positions.",
  fetchVaultsFailure: "Failed to fetch vault data.",
  fetchTokensFailure: "Failed to fetch token data.",
};

const announcementDurationInDays = 28;

const announcements = [
  {
    id: "initialBetaRelease",
    message:
      "Welcome to the new beta version, powered by the Yearn SDK, please see about section for more info",
    date: "2021-06-07",
  },
  {
    id: "vaultSortingRelease",
    message: "You can now re-order vaults by any field! Configure via settings button.",
    date: "2020-12-08",
  },
  {
    id: "matrixThemeRelease",
    message:
      "Unfortunately, no one can be told what The Matrix is. You'll have to see it for yourself (in the settings menu).",
    date: "2021-01-03",
  },
];

export { errorMessages, announcements, announcementDurationInDays };
