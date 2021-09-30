import { getCurrentThemeName } from "components/pageContainer/header/settingsPanel/selectors";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import ConnectionContext from "./context";
import { initOnboard, initNotify } from "./services";
import { actions } from "./slice";
import yearn from "utils/yearnSDK";

export default function ConnectionProvider(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const [address, setAddress] = useState(null);
  const [wallet, setWallet] = useState({});
  const [onboard, setOnboard] = useState(null);
  const [ready, setReady] = useState(false);
  const [notify, setNotify] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [connected, setConnected] = useState(false);
  const [yearnSDK, setYearnSDK] = useState(null);

  const themeName = useSelector(getCurrentThemeName);
  const usingDarkMode = themeName.includes("Dark");

  const initializeWeb3 = () => {
    const web3 = new Web3(process.env.NEXT_PUBLIC_WEB3_PROVIDER);
    web3.eth.net.isListening().then(() => {
      dispatch(actions.connected());
      setConnected(true);
    });
    setWeb3(web3);
  };

  const initializeYearnSDK = () => {
    setYearnSDK(yearn);
  };

  const initializeWallet = () => {
    const selectWallet = (newWallet) => {
      if (newWallet.provider) {
        setWallet(newWallet);
        window.localStorage.setItem("selectedWallet", newWallet.name);
      } else {
        setWallet({});
      }
    };

    const onboardConfig = {
      address: setAddress,
      wallet: selectWallet,
    };

    const newOnboard = initOnboard(onboardConfig, usingDarkMode);
    setNotify(initNotify(usingDarkMode));
    setOnboard(newOnboard);
  };

  const addressChanged = () => {
    if (address) {
      dispatch(actions.addressChanged(address));
    }
  };

  const reconnectWallet = () => {
    const previouslySelectedWallet = window.localStorage.getItem("selectedWallet");
    if (previouslySelectedWallet && onboard) {
      (async () => {
        const walletSelected = await onboard.walletSelect(previouslySelectedWallet);
        if (walletSelected) {
          const ready = await onboard.walletCheck();
          setReady(ready);
        }
      })();
    }
  };

  useEffect(initializeWeb3, []);
  useEffect(initializeYearnSDK, []);
  useEffect(initializeWallet, []);

  // Update dark mode when theme is dark.
  useEffect(() => {
    if (onboard !== null) {
      onboard.config({ darkMode: usingDarkMode });
    }
  }, [usingDarkMode, onboard]);

  useEffect(reconnectWallet, [onboard]);
  useEffect(addressChanged, [address]);

  // SelectWallet function stored as ref, so that its not recreated and passed
  // into context as a new function instance everytime any state is set.
  let selectWallet = useRef(() => {});
  selectWallet.current = async () => {
    const walletSelected = await onboard.walletSelect();

    if (!walletSelected) {
      return;
    }

    const ready = await onboard.walletCheck();
    setReady(ready);
  };

  return (
    <ConnectionContext.Provider
      value={{
        onboard,
        ready,
        wallet,
        address,
        selectWallet: selectWallet.current,
        web3,
        connected,
        yearnSDK,
        notify,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}
