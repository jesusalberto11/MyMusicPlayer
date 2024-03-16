import "../../styles/music player/CurrentSongDetails.css";
import noCoverImg from "../../assets/no-cover.png";
import { useEffect, useRef, useState } from "react";
import { ISong } from "../../interfaces/ISong";
import { useTranslation } from "react-i18next";

const CurrentSongDetails = (props: { currentSongData: ISong | null }) => {
  const [t] = useTranslation("global");
  const songAlbumContainer = useRef<null | HTMLDivElement>(null);
  const songAlbumText = useRef<null | HTMLDivElement>(null);
  const [songAlbumTextIsBigger, setSongAlbumTextIsBigger] = useState(false);

  useEffect(() => {
    const container = songAlbumContainer?.current;
    const text = songAlbumText?.current;

    if (!text || !container) return;

    setSongAlbumTextIsBigger(text.scrollWidth > container.clientWidth);
  }, [props.currentSongData]);

  const checkSongImage = () => {
    if (!props.currentSongData?.image) {
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
            : t("MUSIC-PLAYER.NO-SONG-PLAYING")}
        </h2>
        <div className="song-artist-album-container">
          <p className="song-artist">
            {props.currentSongData?.artist
              ? props.currentSongData?.artist
              : t("MUSIC-PLAYER.UNKNOWN-ARTIST")}
          </p>
          <p>●</p>
          <div ref={songAlbumContainer} className="song-album">
            <p
              ref={songAlbumText}
              className={
                songAlbumTextIsBigger
                  ? "song-album-text text-scroll"
                  : "song-album-text"
              }
            >
              {props.currentSongData?.album
                ? props.currentSongData?.album
                : t("MUSIC-PLAYER.UNKNOWN-ALBUM")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentSongDetails;
