import { Typography } from "@material-ui/core";
import AnimatedTicker from "components/vaultsReport/animatedTicker/AnimatedTicker";
import { makeTokenPriceSelector, getTokenSelector } from "components/vaultsReport/selectors";
import TokenLink from "components/vaultsReport/tokenLink";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { pure } from "recompose";
import holdingsFormatterFactory from "utils/holdingsFormatterFactory";
import normalizedValue from "utils/normalizedValue";

function TokenAndFiatBalance({ rawBalance, tokenAddress }) {
  const tokenPriceSelector = useMemo(() => makeTokenPriceSelector(tokenAddress), []);
  const tokenPrice = useSelector(tokenPriceSelector);

  const getToken = useMemo(getTokenSelector, []);
  const token = useSelector((state) => getToken(state, tokenAddress));

  if (!token) {
    return null;
  }

  const tokenBalance = normalizedValue(rawBalance, token.decimals);
  const convertedFiatBalance = tokenBalance * tokenPrice;

  return (
    <>
      <div>
        <AnimatedTicker value={tokenBalance} formatter={holdingsFormatterFactory()} />{" "}
        <TokenLink address={token.address} linkText={token.symbolAlias} titleText={token.name} />
      </div>
      <div>
        <AnimatedTicker value={convertedFiatBalance} formatter={holdingsFormatterFactory()} />{" "}
        <Typography display="inline">USD </Typography>
      </div>
    </>
  );
}

export default pure(TokenAndFiatBalance);
