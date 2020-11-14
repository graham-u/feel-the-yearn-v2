import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import ConnectionProvider from "components/connectionProvider";
import DrizzleCreator from "components/drizzleCreator";
import PageContainer from "components/pageContainer";
import dynamic from "next/dynamic";
import NoSSR from "react-no-ssr";
import getTheme from "theme/getTheme";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[require("react-redux/lib"), "useSelector"]],
  });
}

const StoreProvider = dynamic(() => import("components/storeProvider"), {
  ssr: false,
});

const theme = getTheme();

function MyApp({ Component, pageProps }) {
  return (
    <NoSSR>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <StoreProvider>
            <ConnectionProvider>
              <DrizzleCreator>
                <PageContainer>
                  <Component {...pageProps} />
                </PageContainer>
              </DrizzleCreator>
            </ConnectionProvider>
          </StoreProvider>
        </ThemeProvider>
      </CssBaseline>
    </NoSSR>
  );
}

export default MyApp;
