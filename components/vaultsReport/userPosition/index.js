import Grid from "@material-ui/core/Grid";
import UserHoldings from "components/vaultsReport/userPosition/userHoldings";
import UserStats from "components/vaultsReport/userPosition/userStats";

function UserPosition({ vault }) {
  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <UserHoldings vault={vault} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <UserStats vault={vault} />
      </Grid>
    </Grid>
  );
}

export default UserPosition;
