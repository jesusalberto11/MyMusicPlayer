import "../../styles/layout/Sidebar.css";
import { SVG_ICONS } from "../../helpers/svgIcons";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <input type="search" className="searchbar" placeholder="Search" />
      <nav className="sidebar-nav">
        <hr />
        <SidebarItem to="/" title="Songs" icon={SVG_ICONS.MUSIC_NOTE} />
        <SidebarItem to="/albums" title="Albums" icon={SVG_ICONS.MUSIC_ALBUM} />
        <SidebarItem
          to="/artists"
          title="Artists"
          icon={SVG_ICONS.FILE_MUSIC}
        />
        <SidebarItem
          to="/playlists"
          title="Playlists"
          icon={SVG_ICONS.PLAY_LIST}
        />
        <hr />
        <SidebarItem to="settings" title="Settings" icon={SVG_ICONS.SETTINGS} />
      </nav>
    </div>
  );
};

export default Sidebar;
