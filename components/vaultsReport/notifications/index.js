import Notifier from "components/notifier";
import {
  getUserStatsFetchFailed,
  getVaultRegistryFetchFailed,
  getTokenPricesFetchFailed,
  getVaultApyStatsFetchFailed,
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
    </>
  );
}

export default Notifications;
