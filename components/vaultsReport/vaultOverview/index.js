import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StrategyLink from "components/vaultsReport/vaultOverview/strategyLink";
import VaultLink from "components/vaultsReport/vaultOverview/vaultLink";

const useContainerStyles = makeStyles({
  root: {
    marginBottom: "1rem",
  },
});

function VaultOverview({ vault }) {
  const containerClasses = useContainerStyles();

  return (
    <Card>
      <CardContent>
        <div className={containerClasses.root}>
          <Typography>Vault</Typography>
          <VaultLink
            address={vault.address}
            linkText={vault.vaultAlias}
            titleText={vault.name}
          />
        </div>

        <div>
          <Typography>Strategy</Typography>
          <StrategyLink
            address={vault.strategyAddress}
            linkText={vault.strategyName}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default VaultOverview;
