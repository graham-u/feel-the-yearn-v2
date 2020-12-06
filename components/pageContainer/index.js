import { Container } from "@material-ui/core/";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "components/pageContainer/header";
import { Notifications } from "components/pageContainer/notifications";

const usePageStyles = makeStyles((theme) => {
  return {
    root: {
      background: theme.palette.background.default,
    },
  };
});

function PageContainer({ children }) {
  const pageClasses = usePageStyles();

  return (
    <div className={pageClasses.root}>
      <Notifications />
      <Container maxWidth="lg">
        <header>
          <Header />
        </header>
        {children}
      </Container>
    </div>
  );
}

export default PageContainer;
