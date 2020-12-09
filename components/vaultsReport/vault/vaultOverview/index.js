import { useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import RoiStats from "components/vaultsReport/vault/vaultOverview/apyStats";
import StrategyLink from "components/vaultsReport/vault/vaultOverview/strategyLink";
import VaultLink from "components/vaultsReport/vault/vaultOverview/vaultLink";
import ReactImageFallback from "react-image-fallback";

const useVaultLogoStyles = makeStyles((theme) => {
  return {
    [theme.breakpoints.down("xs")]: {
      root: {
        float: "right",
      },
    },
  };
});

const useVaultDetailsStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: "0.4rem",
    },
  };
});

const getVaultLogo = (vault) =>
  `https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/${vault.tokenAddress}/logo.svg`;

const fallBackLogo = <HelpOutlineOutlinedIcon style={{ fontSize: 48 }} />;

function VaultOverview({ vault }) {
  const theme = useTheme();
  const direction = useMediaQuery(theme.breakpoints.down("xs")) ? "row-reverse" : "row";
  const vaultLogoClasses = useVaultLogoStyles();
  const vaultDetailsClasses = useVaultDetailsStyles();

  return (
    <Grid container direction={direction}>
      <Grid item xs={3} sm={1} md={2}>
        <ReactImageFallback
          src={getVaultLogo(vault)}
          fallbackImage={fallBackLogo}
          alt="Vault logo"
          className={vaultLogoClasses.root}
          width={48}
          height={48}
        />
      </Grid>
      <Grid container item xs={9} sm={11} md={10} justify="space-between">
        <Grid item className={vaultDetailsClasses.root}>
          <VaultLink address={vault.address} linkText={vault.vaultAlias} titleText={vault.name} />
          <StrategyLink
            address={vault.strategyAddress}
            linkText={vault.strategyName}
            titleText={vault.strategyName}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={10}>
          <RoiStats vaultAddress={vault.address} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VaultOverview;
