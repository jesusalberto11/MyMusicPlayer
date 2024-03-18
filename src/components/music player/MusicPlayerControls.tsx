import "../../styles/music player/MusicPlayerControls.css";
import { SVG_ICONS } from "../../helpers/svgIcons";
import SimpleButton from "../shared/SimpleButton";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";

const MusicPlayerControls = () => {
  const { isSongPlaying, setPlay, setPause } = useMusicPlayer();

  return (
    <div className="music-player-controls">
      <div className="music-player-buttons">
        <SimpleButton
          showTitle={false}
          title="Previous song"
          icon={SVG_ICONS.SKIP_START}
        />
        <button
          className="play-button"
          onClick={isSongPlaying ? () => setPause() : () => setPlay()}
        >
          <svg width="32" height="32" fill="#fff" viewBox="0 0 16 16">
            <path d={isSongPlaying ? SVG_ICONS.PAUSE : SVG_ICONS.PLAY} />
          </svg>
        </button>
        <SimpleButton
          showTitle={false}
          title="Next song"
          icon={SVG_ICONS.SKIP_END}
        />
      </div>
    </div>
  );
};

export default MusicPlayerControls;
