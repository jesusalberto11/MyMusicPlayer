import "../../styles/music player/ProgressBar.css";

const ProgressBar = (props: {
  currentSongTime: string | null;
  currentSongTotalDuration: string | null;
  currentSongPercentaje: number;
  handleSongProgressBarClick: any;
}) => {
  const onClickProgressBar = (e: any) => {
    const progressBarArea = e.currentTarget;
    const progressWidthValue = progressBarArea.clientWidth;
    const clickedOffsetX = e.nativeEvent.offsetX;

    props.handleSongProgressBarClick(progressWidthValue, clickedOffsetX);
  };

  return (
    <div className="progress-area-container">
      <span className="current">
        {props.currentSongTime ? props.currentSongTime : "0:00"}
      </span>
      <div className="progress-area" onClick={(e) => onClickProgressBar(e)}>
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
