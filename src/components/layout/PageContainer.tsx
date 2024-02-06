import "../../styles/layout/PageContainer.css";
import { ReactNode } from "react";

const PageContainer = (props: { title?: string; children: ReactNode }) => {
  return (
    <div className="page-container">
      <div className="main-page-header">
        <h1>{props.title}</h1>
      </div>
      {props.children}
    </div>
  );
};

export default PageContainer;
