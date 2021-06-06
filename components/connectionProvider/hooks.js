import { useContext } from "react";
import context from "./context";

export function useReady() {
  const { ready } = useContext(context);
  return ready;
}

export function useWeb3() {
  const { web3 } = useContext(context);
  return web3;
}

export function useYearnSDK() {
  const { yearnSDK } = useContext(context);
  return yearnSDK;
}

export function useAddress() {
  const { address } = useContext(context);
  return address;
}

export function useSelectWallet() {
  const { selectWallet } = useContext(context);
  return selectWallet;
}
