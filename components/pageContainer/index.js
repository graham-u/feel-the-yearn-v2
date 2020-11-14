import { Container } from "@material-ui/core/";
import Header from "components/pageContainer/header";

function PageContainer({ children }) {
  return (
    <Container maxWidth="xl">
      <header>
        <Header />
      </header>
      {children}
    </Container>
  );
}

export default PageContainer;
