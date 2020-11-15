const getVaults = (state) => state.vaultsReport.vaultRegistry.vaults;

const getContractsAddedToDrizzle = (state) =>
  state.vaultsReport.contractsAddedToDrizzle;

export { getVaults, getContractsAddedToDrizzle };
