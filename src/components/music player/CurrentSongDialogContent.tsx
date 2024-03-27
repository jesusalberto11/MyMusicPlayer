import "../../styles/music player/CurrentSongDialogContent.css";
import { ISong } from "../../interfaces/ISong";
import SongImage from "../songs/SongImage";
import SimpleButton from "../shared/SimpleButton";
import { SVG_ICONS } from "../../helpers/svgIcons";
import { useTranslation } from "react-i18next";

const CurrentSongDialogContent = (props: {
  currentSongData: ISong | null;
  closeDialog: Function;
}) => {
  const [t] = useTranslation("global");

  return (
    <div>
      <div className="dialog-close-btn">
        <SimpleButton
          showTitle={false}
          title="Close Dialog"
          icon={SVG_ICONS.CLOSE}
          onClickItem={() => props.closeDialog()}
        />
      </div>
      <div className="song-dialog-content-header flex centered">
        <SongImage
          imageSrc={
            props?.currentSongData?.image ? props?.currentSongData?.image : null
          }
          height="120"
        />
        <p>{props.currentSongData?.title}</p>
        <p className="song-dialog-item-title">
          {props.currentSongData?.artist}
        </p>
      </div>
      <div className="song-dialog-content flex centered">
        {props.currentSongData ? (
          <>
            <p className="song-dialog-item-title">{t("SONG-DATA.ALBUM")}</p>
            <p>{props.currentSongData?.album}</p>
            <hr />
            <p className="song-dialog-item-title">{t("SONG-DATA.YEAR")}</p>
            <p>{props.currentSongData?.year}</p>
          </>
        ) : (
          <p>{t("MUSIC-PLAYER.NO-SONG-PLAYING")}</p>
        )}
      </div>
    </div>
  );
};

export default CurrentSongDialogContent;
