import { SVG_ICONS } from "../../helpers/svgIcons";
import "../../styles/layout/Sidebar.css";
import SVGIcon from "../shared/SVGIcon";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <input type="search" className="searchbar" placeholder="Search" />
      <nav className="sidebar-nav">
        <hr />
        <div className="sidebar-nav-item">
          <SVGIcon icon={SVG_ICONS.MUSIC_NOTE} />
          Songs
        </div>
        <div className="sidebar-nav-item">
          <SVGIcon icon={SVG_ICONS.MUSIC_ALBUM} />
          Albums
        </div>
        <div className="sidebar-nav-item">
          <SVGIcon icon={SVG_ICONS.FILE_MUSIC} />
          Artists
        </div>
        <div className="sidebar-nav-item">
          <SVGIcon icon={SVG_ICONS.PLAY_LIST} />
          Playlists
        </div>
        <hr />
        <div className="sidebar-nav-item">
          <SVGIcon icon={SVG_ICONS.SETTINGS} />
          Settings
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
