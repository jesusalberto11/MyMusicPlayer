import "../../styles/layout/PageContainer.css";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

const PageContainerWithBack = (props: {
  backRoute: string;
  oldRoute?: string;
  currentRoute?: string;
  children: ReactNode;
}) => {
  return (
    <div className="page-container">
      <div className="main-page-header">
        <h1 className="double-header-title">
          <Link
            to={props.backRoute}
            replace={true}
            className="back-route-header"
          >
            {props.oldRoute}
          </Link>
          /{props.currentRoute}
        </h1>
      </div>
      {props.children}
    </div>
  );
};

export default PageContainerWithBack;
