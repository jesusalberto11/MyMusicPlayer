import "../../styles/layout/PageContainer.css";
import { ReactNode } from "react";

const PageContainer = (props: { children: ReactNode }) => {
  return <div className="page-container">{props.children}</div>;
};

export default PageContainer;
