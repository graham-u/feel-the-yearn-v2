import { Typography as T } from "@material-ui/core";

function About() {
  return (
    <>
      <T variant={"h2"} gutterBottom={true}>
        What's this
      </T>
      <T paragraph={true}>
        This is the new version of feel-the-yearn. A site that allows users to view yearn.finance
        vaults and track their holdings and earnings.
      </T>
      <T paragraph={true}>
        This new version fetches its data from the new Yearn SDK which makes it easier for projects
        to fetch data and interact with the yearn ecosystem.
      </T>
      <T paragraph={true}>
        SDK development is still ongoing in order make all the required functionality available, so
        for now, a few things are missing from this new version of the site as compared to the
        previous version.
      </T>
      <T paragraph={true}>The new site...</T>
      <ul>
        <li>Requires page reloading to show updated data</li>
        <li>Does not show V1 vaults</li>
        <li>Does not allow you to selected a local currency to show holdings / earnings</li>
      </ul>

      <T variant={"h2"} gutterBottom={true}>
        What's new
      </T>
      <T variant={"h6"} component={"h3"}>
        15th June 2021
      </T>
      <ul>
        <li>Add strategy holdings percentages and strategy holdings breakdown pie chart.</li>
      </ul>
      <T variant={"h6"} component={"h3"}>
        13th June 2021
      </T>
      <ul>
        <li>
          Choose to show only vaults you are (or previously were) invested in, see visibility
          settings in the settings menu.
        </li>
        <li>All strategies listed (and linked) for each vault along with their total assets</li>
      </ul>
      <T variant={"h6"} component={"h3"}>
        7th June 2021
      </T>
      <ul>
        <li>Updated site to work with Yearn SDK</li>
      </ul>
    </>
  );
}

export default About;
