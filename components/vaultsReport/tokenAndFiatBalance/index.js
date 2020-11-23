import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { selectors as settingSelectors } from "components/pageContainer/header/controlPanel/slice";
import AnimatedTicker from "components/vaultsReport/animatedTicker/AnimatedTicker";
import {
  makeTokenPriceSelector,
  getTokenSelector,
  getTokenPricesLoading,
} from "components/vaultsReport/selectors";
import TokenLink from "components/vaultsReport/tokenLink";
import produce, { setAutoFreeze } from "immer";
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

  const tokenPricesLoading = useSelector(getTokenPricesLoading);
  const localCurrency = useSelector(settingSelectors.getLocalCurrency);

  let shouldShowFiatBalance = false;
  let shouldShowTokenBalance = false;
  let tokenBalance = null;
  let fiatBalance = null;

  if (token && rawBalance !== null) {
    tokenBalance = normalizedValue(rawBalance, token.decimals);
    fiatBalance = tokenBalance * tokenPrice;

    shouldShowFiatBalance = fiatBalance >= fiatMinShow;
    shouldShowTokenBalance = tokenBalance >= tokenMinShow;
  }

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
          <ThemeProvider
            theme={(outerTheme) => {
              // Have to turn off autofreeze otherwise immer tries to freeze an immutable theme
              // property which causes an error.
              setAutoFreeze(false);
              return produce(outerTheme, (draftState) => {
                draftState.palette.text.primary = outerTheme.palette.text.hint;
              });
            }}
          >
            {tokenPricesLoading ? (
              <Typography display="inline">Loading...</Typography>
            ) : (
              <AnimatedTicker value={fiatBalance} formatter={holdingsFormatterFactory()} />
            )}{" "}
            <Typography color={"textPrimary"} display="inline">
              {localCurrency}
            </Typography>
          </ThemeProvider>
        ) : (
          <Typography display="inline">-</Typography>
        )}
      </div>
    </>
  );
}

export default pure(TokenAndFiatBalance);
