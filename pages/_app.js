import NoSSR from "react-no-ssr";
import { Provider } from "react-redux";
import store from "redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <NoSSR>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </NoSSR>
  );
}

export default MyApp;
