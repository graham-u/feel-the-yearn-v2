import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { getToken } from "components/vaultsReport/getTokensSelectors";
import { getUnderlyingTokensLoading } from "components/vaultsReport/selectors";
import AnimatedTicker from "components/vaultsReport/vault/animatedTicker/AnimatedTicker";
import TokenLink from "components/vaultsReport/vault/tokenLink";
import produce, { setAutoFreeze } from "immer";
import { isUndefined } from "lodash";
import { useSelector } from "react-redux";
import { pure } from "recompose";
import holdingsFormatterFactory from "utils/holdingsFormatterFactory";

const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

function TokenAndUSDCBalance({
  tokenBalance,
  usdcBalance,
  token,
  tokenDisplayPrecision = 2,
  usdcMinShow = 0,
  tokenMinShow = 0,
}) {
  const tokensLoading = useSelector(getUnderlyingTokensLoading);

  const USDCToken = useSelector((state) => getToken(state, USDCAddress));

  if (tokensLoading) {
    return "Tokens loading";
  }

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
            <TokenLink token={token} />
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
            <TokenLink token={USDCToken} />
          </ThemeProvider>
        ) : (
          <Typography display="inline">-</Typography>
        )}
      </div>
    </>
  );
}

export default pure(TokenAndUSDCBalance);
