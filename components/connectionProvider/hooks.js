import { useContext } from "react";
import context from "./context";

export function useConnected() {
  const { connected } = useContext(context);
  return connected;
}

export function useReady() {
  const { ready } = useContext(context);
  return ready;
}

export function useWeb3() {
  const { web3 } = useContext(context);
  return web3;
}

export function useAddress() {
  const { address } = useContext(context);
  return address;
}

export function useSelectWallet() {
  const { selectWallet } = useContext(context);
  return selectWallet;
}
