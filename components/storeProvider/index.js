import { Provider } from "react-redux";
import createStore from "./createStore";

const store = createStore();

function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
