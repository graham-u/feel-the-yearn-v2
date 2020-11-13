import whyDidYouRender from "@welldone-software/why-did-you-render";
import ConnectionProvider from "components/connectionProvider";
import DrizzleCreator from "components/drizzleCreator";
import dynamic from "next/dynamic";
import NoSSR from "react-no-ssr";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[require("react-redux/lib"), "useSelector"]],
  });
}

const StoreProvider = dynamic(() => import("components/storeProvider"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <NoSSR>
      <StoreProvider>
        <ConnectionProvider>
          <DrizzleCreator>
            <Component {...pageProps} />
          </DrizzleCreator>
        </ConnectionProvider>
      </StoreProvider>
    </NoSSR>
  );
}

export default MyApp;
