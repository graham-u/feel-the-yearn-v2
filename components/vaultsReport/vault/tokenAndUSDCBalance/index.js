import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import AnimatedTicker from "components/vaultsReport/vault/animatedTicker/AnimatedTicker";
import TokenLink from "components/vaultsReport/vault/tokenLink";
import produce, { setAutoFreeze } from "immer";
import { isUndefined } from "lodash";
import { pure } from "recompose";
import holdingsFormatterFactory from "utils/holdingsFormatterFactory";

function TokenAndUSDCBalance({
  tokenBalance,
  usdcBalance,
  token,
  tokenDisplayPrecision = 2,
  usdcMinShow = 0,
  tokenMinShow = 0,
}) {
  const shouldShowUSDCBalance = !isUndefined(usdcBalance) && usdcBalance >= usdcMinShow;
  const shouldShowTokenBalance =
    !isUndefined(token) && !isUndefined(tokenBalance) && tokenBalance >= tokenMinShow;

  return (
    <>
      <div>
        {shouldShowTokenBalance ? (
          <>
            <AnimatedTicker
              value={tokenBalance}
              formatter={holdingsFormatterFactory({ precision: tokenDisplayPrecision })}
            />{" "}
            <TokenLink address={token.address} linkText={token.symbol} titleText={token.name} />
          </>
        ) : (
          <Typography display="inline">-</Typography>
        )}
      </div>

      <div>
        {shouldShowUSDCBalance ? (
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
            <AnimatedTicker value={usdcBalance} formatter={holdingsFormatterFactory()} />{" "}
            <Typography color={"textPrimary"} display="inline">
              USDC
            </Typography>
          </ThemeProvider>
        ) : (
          <Typography display="inline">-</Typography>
        )}
      </div>
    </>
  );
}

export default pure(TokenAndUSDCBalance);
