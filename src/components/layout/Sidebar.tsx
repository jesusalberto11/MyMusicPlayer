import { useState } from "react";
import "../../styles/layout/Sidebar.css";
import { SVG_ICONS } from "../../helpers/svgIcons";
import SidebarItem from "./SidebarItem";
import SimpleButton from "../shared/SimpleButton";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={isSidebarOpen ? "sidebar active" : "sidebar"}>
      <SimpleButton
        showTitle={false}
        title="Open menu"
        icon={SVG_ICONS.THREE_LINES}
        onClickItem={openSidebar}
      />
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
