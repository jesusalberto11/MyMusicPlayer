import "../../styles/music player/ExpandMusicPlayer.css";
import SVGIcon from "../shared/SVGIcon";
import { Link, useLocation } from "react-router-dom";
import { SVG_ICONS } from "../../helpers/svgIcons";

const ExpandMusicPlayer = () => {
  const location = useLocation();

  return (
    <Link
      className="expand-music-player"
      to={location.pathname === "/music-player" ? "/" : "music-player"}
      title={
        location.pathname === "/music-player"
          ? "Go to home"
          : "Expand music player"
      }
    >
      <SVGIcon
        icon={
          location.pathname === "/music-player"
            ? SVG_ICONS.MUSIC_NOTE
            : SVG_ICONS.EXPAND
        }
      />
    </Link>
  );
};

export default ExpandMusicPlayer;
