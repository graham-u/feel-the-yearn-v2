import { Container } from "@material-ui/core/";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "components/pageContainer/header";
import { Notifications } from "components/pageContainer/notifications";

const usePageStyles = makeStyles((theme) => {
  return {
    root: {
      background: theme.palette.background.default,
      height: "100vh",
    },
  };
});

const useContainerStyles = makeStyles((theme) => {
  const styles = {};

  if (theme?.container?.background) {
    styles.root = {
      background: theme.container.background,
    };
  }

  return styles;
});

function PageContainer({ children }) {
  const pageClasses = usePageStyles();
  const containerClasses = useContainerStyles();

  return (
    <div className={pageClasses.root}>
      <Notifications />
      <Container maxWidth="lg" className={containerClasses.root}>
        <header>
          <Header />
        </header>
        {children}
      </Container>
    </div>
  );
}

export default PageContainer;
