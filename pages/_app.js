import CssBaseline from "@material-ui/core/CssBaseline";
import ConnectionProvider from "components/connectionProvider";
import { CustomThemeProvider as ThemeProvider } from "components/customThemeProvider";
import dynamic from "next/dynamic";
import Head from "next/head";
import NoSSR from "react-no-ssr";

const StoreProvider = dynamic(() => import("components/storeProvider"), {
  ssr: false,
});

const PageContainer = dynamic(() => import("components/pageContainer"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <NoSSR>
      <CssBaseline />
      <StoreProvider>
        <ThemeProvider>
          <ConnectionProvider>
            <PageContainer>
              <Head>
                <title>Feel the Yearn</title>
              </Head>
              <Component {...pageProps} />
            </PageContainer>
          </ConnectionProvider>
        </ThemeProvider>
      </StoreProvider>
    </NoSSR>
  );
}

export default MyApp;
