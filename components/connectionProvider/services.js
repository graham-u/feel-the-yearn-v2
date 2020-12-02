import Onboard from "bnc-onboard";
import Notify from "bnc-notify";

const networkId = 1;
const rpcUrl = process.env.NEXT_PUBLIC_BLOCKNATIVE_RPC_URL;
const dappId = process.env.NEXT_PUBLIC_BLOCKNATIVE_DAPP_ID;

export function initOnboard(subscriptions) {
  return Onboard({
    dappId,
    hideBranding: true,
    networkId,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: "metamask" },
        {
          walletName: "ledger",
          rpcUrl,
        },
        { walletName: "dapper" },
        { walletName: "coinbase" },
        { walletName: "status" },
        { walletName: "walletLink", rpcUrl },
        { walletName: "unilogin" },
        { walletName: "torus" },
        { walletName: "authereum", disableNotifications: true },
        { walletName: "trust", rpcUrl },
        { walletName: "walletConnect", rpc: { [networkId]: rpcUrl } },
        { walletName: "opera" },
        { walletName: "operaTouch" },
        { walletName: "imToken", rpcUrl },
        { walletName: "meetone" },
      ],
    },
    walletCheck: [
      { checkName: "derivationPath" },
      { checkName: "connect" },
      { checkName: "accounts" },
      { checkName: "network" },
    ],
  });
}

export function initNotify(darkMode) {
  return Notify({
    dappId,
    networkId,
    darkMode,
  });
}
