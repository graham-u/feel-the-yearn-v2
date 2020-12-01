import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { getLocalCurrency } from "components/pageContainer/header/settingsPanel/selectors";
import { getTokenPricesLoading } from "components/vaultsReport/selectors";
import AnimatedTicker from "components/vaultsReport/vault/animatedTicker/AnimatedTicker";
import TokenLink from "components/vaultsReport/vault/tokenLink";
import produce, { setAutoFreeze } from "immer";
import { isUndefined } from "lodash";
import { useSelector } from "react-redux";
import { pure } from "recompose";
import holdingsFormatterFactory from "utils/holdingsFormatterFactory";

function TokenAndFiatBalance({
  tokenBalance,
  fiatBalance,
  token,
  tokenDisplayPrecision = 2,
  fiatMinShow = 0,
  tokenMinShow = 0,
}) {
  const tokenPricesLoading = useSelector(getTokenPricesLoading);
  const localCurrency = useSelector(getLocalCurrency);

  const shouldShowFiatBalance = !isUndefined(fiatBalance) && fiatBalance >= fiatMinShow;
  const shouldShowTokenBalance = !isUndefined(tokenBalance) && tokenBalance >= tokenMinShow;

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
            <AnimatedTicker
              value={fiatBalance}
              formatter={holdingsFormatterFactory()}
              loading={tokenPricesLoading}
            />{" "}
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
