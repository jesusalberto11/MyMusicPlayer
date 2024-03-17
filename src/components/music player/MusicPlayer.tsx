import "../../styles/music player/MusicPlayer.css";
import CurrentSongDetails from "./CurrentSongDetails";
import MusicPlayerControls from "./MusicPlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";

const MusicPlayer = () => {
  const {
    currentSong,
    currentSongTotalDuration,
    handleSongProgressBarClick,
    currentSongTime,
    currentSongPercentaje,
  } = useMusicPlayer();

  return (
    <div className="music-player">
      <ProgressBar
        handleSongProgressBarClick={handleSongProgressBarClick}
        currentSongTime={currentSongTime}
        currentSongTotalDuration={currentSongTotalDuration}
        currentSongPercentaje={currentSongPercentaje}
      />
      <div className="music-player-bottom">
        <CurrentSongDetails currentSongData={currentSong} />
        <MusicPlayerControls />
        <div className="flex centered">
          <VolumeControl />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
