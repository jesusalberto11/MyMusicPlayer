import "../../styles/layout/PageContainer.css";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import SimpleButton from "../shared/SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";

const PageContainerWithBack = (props: {
  backRoute: string;
  oldRoute?: string;
  currentRoute?: string;
  openMenu: Function;
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
        <SimpleButton
          showTitle={false}
          title="Open options"
          icon={SVG_ICONS.SETTINGS}
          onClickItem={() => props?.openMenu()}
        />
      </div>
      {props.children}
    </div>
  );
};

export default PageContainerWithBack;
