import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import ConnectionProvider from "components/connectionProvider";
import DrizzleCreator from "components/drizzleCreator";
import PageContainer from "components/pageContainer";
import dynamic from "next/dynamic";
import Head from "next/head";
import NoSSR from "react-no-ssr";
import getTheme from "theme/getTheme";
import "theme/global.css";

const StoreProvider = dynamic(() => import("components/storeProvider"), {
  ssr: false,
});

const theme = getTheme();

function MyApp({ Component, pageProps }) {
  return (
    <NoSSR>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <ConnectionProvider>
            <DrizzleCreator>
              <PageContainer>
                <Head>
                  <title>Feel the Yearn</title>
                </Head>
                <Component {...pageProps} />
              </PageContainer>
            </DrizzleCreator>
          </ConnectionProvider>
        </StoreProvider>
      </ThemeProvider>
    </NoSSR>
  );
}

export default MyApp;
