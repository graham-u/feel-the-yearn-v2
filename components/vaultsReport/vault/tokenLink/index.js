import { ThemedLink as Link } from "components/Link";

function TokenLink({ token }) {
  if (!token) {
    return false;
  }

  const url = `https://etherscan.io/address/${token.address}`;
  return (
    <Link href={url} title={token.name} variant="body1">
      <img src={token.icon} height={16} width={16} style={{ verticalAlign: "text-top" }} />
    </Link>
  );
}

export default TokenLink;
