import currency from "currency.js";

const defaultOptions = {
  symbol: "",
  precision: 2,
};

const holdingsFormatterFactory = (options = {}) => (value) => {
  options = { ...defaultOptions, ...options };
  return <b>{currency(value, options).format()}</b>;
};

export default holdingsFormatterFactory;
