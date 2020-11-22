import Notifier from "components/vaultsReport/notifier";
import {
  getUserStatsFetchFailed,
  getVaultRegistryFetchFailed,
  getTokenPricesFetchFailed,
  getVaultApyStatsFetchFailed,
  getContractsMissingFromDrizzle,
} from "components/vaultsReport/selectors";
import { notificationMessages } from "siteConfig";

function Notifications() {
  return (
    <>
      <Notifier
        shouldShowSelector={getUserStatsFetchFailed}
        message={notificationMessages.userStatsFetchFailed}
        severity="error"
      />
      <Notifier
        shouldShowSelector={getVaultRegistryFetchFailed}
        message={notificationMessages.vaultRegistryFetchFailed}
        severity="error"
      />
      <Notifier
        shouldShowSelector={getTokenPricesFetchFailed}
        message={notificationMessages.tokenPricesFetchFailed}
        severity="error"
      />
      <Notifier
        shouldShowSelector={getVaultApyStatsFetchFailed}
        message={notificationMessages.vaultApyStatsFetchFailed}
        severity="error"
      />
      <Notifier
        shouldShowSelector={getContractsMissingFromDrizzle}
        message={notificationMessages.contractsMissingFromDrizzle}
        severity="error"
      />
    </>
  );
}

export default Notifications;
