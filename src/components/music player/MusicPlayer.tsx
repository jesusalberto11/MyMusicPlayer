import "../../styles/music player/MusicPlayer.css";
import { Song } from "../../interfaces/Song";
import CurrentSongDetails from "./CurrentSongDetails";
import MusicPlayerControls from "./MusicPlayerControls";
import ProgressBar from "./ProgressBar";

const MusicPlayer = (props: {
  currentSongData: Song;
  currentSongTime: string;
  currentSongTotalDuration: string;
  currentSongPercentaje: number;
}) => {
  return (
    <div className="music-player">
      <ProgressBar
        currentSongTime={props.currentSongTime}
        currentSongTotalDuration={props.currentSongTotalDuration}
        currentSongPercentaje={props.currentSongPercentaje}
      />
      <div className="music-player-bottom">
        <CurrentSongDetails currentSongData={props.currentSongData} />
        <MusicPlayerControls />
      </div>
    </div>
  );
};

export default MusicPlayer;
