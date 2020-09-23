import ConnectionBanner from '@rimble/connection-banner';
import {MetaMaskButton} from 'rimble-ui';

function Home() {
  let currentNetwork = null;
  const requiredNetwork = 1;
  let account = null;
  let readyToConnect = false;

  if (typeof window.ethereum !== 'undefined') {
    currentNetwork = parseInt(ethereum.networkVersion);
    account = window.ethereum.selectedAddress || null;
    readyToConnect = account === null && currentNetwork === requiredNetwork;
  }

  return (
    <>
      <ConnectionBanner requiredNetwork={requiredNetwork} currentNetwork={currentNetwork}/>
      {readyToConnect && <MetaMaskButton onClick={() => ethereum.request({ method: 'eth_requestAccounts' })}>Connect with MetaMask for full functionality</MetaMaskButton>}
    </>
  )
}

export default Home;
