import { Typography } from "@material-ui/core";
import AnimatedTicker from "components/vaultsReport/animatedTicker/AnimatedTicker";
import { makeTokenPriceSelector, getTokenSelector } from "components/vaultsReport/selectors";
import TokenLink from "components/vaultsReport/tokenLink";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { pure } from "recompose";
import holdingsFormatterFactory from "utils/holdingsFormatterFactory";
import normalizedValue from "utils/normalizedValue";

function TokenAndFiatBalance({
  rawBalance,
  tokenAddress,
  tokenDisplayPrecision = 2,
  fiatMinShow = 0,
  tokenMinShow = 0,
}) {
  const tokenPriceSelector = useMemo(() => makeTokenPriceSelector(tokenAddress), []);
  const tokenPrice = useSelector(tokenPriceSelector);

  const getToken = useMemo(getTokenSelector, []);
  const token = useSelector((state) => getToken(state, tokenAddress));

  if (!token) {
    return null;
  }

  let tokenBalance = normalizedValue(rawBalance, token.decimals);
  let fiatBalance = tokenBalance * tokenPrice;

  const shouldShowFiatBalance = fiatBalance >= fiatMinShow;
  const shouldShowTokenBalance = tokenBalance >= tokenMinShow;

  return (
    <>
      <div>
        {shouldShowTokenBalance ? (
          <>
            <AnimatedTicker
              value={tokenBalance}
              formatter={holdingsFormatterFactory({ precision: tokenDisplayPrecision })}
            />{" "}
            <TokenLink
              address={token.address}
              linkText={token.symbolAlias}
              titleText={token.name}
            />
          </>
        ) : (
          <Typography display="inline">-</Typography>
        )}
      </div>

      <div>
        {shouldShowFiatBalance ? (
          <>
            <AnimatedTicker value={fiatBalance} formatter={holdingsFormatterFactory()} />{" "}
            <Typography display="inline">USD </Typography>
          </>
        ) : (
          <Typography display="inline">-</Typography>
        )}
      </div>
    </>
  );
}

export default pure(TokenAndFiatBalance);
