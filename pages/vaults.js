import VaultsReport from "components/vaultsReport/index";
import NoSSR from "react-no-ssr";

function Home() {
  return (
    <NoSSR>
      <VaultsReport />
    </NoSSR>
  );
}

export default Home;
