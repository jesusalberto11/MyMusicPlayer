import { Link, useRouteError } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <PageContainer title="¿Where am I?">
      <h1>Oops!</h1>
      <h2>Sorry, an unexpected error has occurred.</h2>
      <h2>Don't modify the URL!</h2>
      <>
        <Link className="sidebar-nav-item" to={"/"}>
          ir al indice
        </Link>
      </>
    </PageContainer>
  );
}
