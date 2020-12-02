import Link from "@material-ui/core/Link";
import produce, { setAutoFreeze } from "immer";
import { ThemeProvider } from "@material-ui/core/styles";

function ThemedLink(props) {
  return (
    <ThemeProvider
      theme={(outerTheme) => {
        // Have to turn off autofreeze otherwise immer tries to freeze an immutable theme
        // property which causes an error.
        setAutoFreeze(false);
        return produce(outerTheme, (draftState) => {
          draftState.palette.text.primary = outerTheme.palette.text.link;
        });
      }}
    >
      <Link {...props} color={"textPrimary"}>
        {props.children}
      </Link>
    </ThemeProvider>
  );
}

export { ThemedLink };
