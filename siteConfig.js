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
    id: "vaultVisibilityRelease",
    message:
      "You can now choose to show only vaults you are (or previously were) invested in, see visibility settings in the settings menu.",
    date: "2021-06-08",
  },
  {
    id: "showStrategiesAndHoldings",
    message: "All strategies now listed (and linked) for each vault along with their total assets.",
    date: "2021-06-13",
  },
];

export { errorMessages, announcements, announcementDurationInDays };
