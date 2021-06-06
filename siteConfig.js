const errorMessages = {
  fetchUserPositionsFailure: "Failed to fetch user positions.",
  fetchVaultsFailure: "Failed to fetch vault data.",
  fetchTokensFailure: "Failed to fetch token data.",
};

const announcementDurationInDays = 7;

const announcements = [
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
