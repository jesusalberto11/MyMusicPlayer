import "../../styles/music player/CurrentSongDetails.css";
import { Song } from "../../interfaces/Song";
import noCoverImg from "../../assets/no-cover.png";

const CurrentSongDetails = (props: { currentSongData: Song }) => {
  const checkSongImage = () => {
    if (
      props.currentSongData?.image === null ||
      props.currentSongData?.image === "null" ||
      !props.currentSongData?.image
    ) {
      return noCoverImg;
    }

    return props.currentSongData?.image;
  };

  return (
    <div className="song-details-container">
      <img src={checkSongImage()} className="current-song-img" />
      <div className="song-details">
        <h2 className="song-name">
          {props.currentSongData?.title
            ? props.currentSongData?.title
            : "No Song playing"}
        </h2>
        <div className="song-artist-album-container">
          <p className="song-artist">
            {props.currentSongData?.artist
              ? props.currentSongData?.artist
              : "No artist"}
          </p>
          <p>●</p>
          <p className="song-album">
            {props.currentSongData?.album
              ? props.currentSongData?.album
              : "No album"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentSongDetails;
