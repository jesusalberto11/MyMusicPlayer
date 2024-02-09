import { Link } from "react-router-dom";
import "../../styles/layout/Sidebar.css";
import SVGIcon from "../shared/SVGIcon";

const SidebarItem = (props: { to: string; title: string; icon: string }) => {
  return (
    <Link className="sidebar-nav-item" to={props.to}>
      <SVGIcon icon={props.icon} />
      <p>{props.title}</p>
    </Link>
  );
};

export default SidebarItem;
