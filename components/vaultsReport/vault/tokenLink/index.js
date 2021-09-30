import { useTheme } from "@material-ui/core";
import { ThemedLink as Link } from "components/Link";

function TokenLink({ token }) {
  const theme = useTheme();

  if (!token) {
    return false;
  }

  const linkContent = theme.vaults.showIcons ? (
    <img
      src={token.icon}
      alt={token.symbol}
      height={16}
      width={16}
      style={{ verticalAlign: "text-top" }}
    />
  ) : (
    token.symbol
  );

  const url = `https://etherscan.io/address/${token.address}`;
  return (
    <Link href={url} title={token.name} variant="body1">
      {linkContent}
    </Link>
  );
}

export default TokenLink;
