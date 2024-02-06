import "../../styles/music player/ProgressBar.css";

const ProgressBar = (props: {
  currentSongTime: string;
  currentSongTotalDuration: string;
  currentSongPercentaje: number;
}) => {
  return (
    <div className="progress-area-container">
      <span className="current">
        {props.currentSongTime ? props.currentSongTime : "0:00"}
      </span>
      <div className="progress-area">
        <div
          className="progress-bar"
          style={{ width: `${props.currentSongPercentaje}%` }}
        >
          <span></span>
        </div>
      </div>
      <span className="duration">
        {props.currentSongTotalDuration
          ? props.currentSongTotalDuration
          : "0:00"}
      </span>
    </div>
  );
};

export default ProgressBar;
