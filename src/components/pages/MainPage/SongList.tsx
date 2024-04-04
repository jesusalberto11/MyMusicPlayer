import "../../../styles/pages/SongList.css";
import SongListItem from "./SongListItem";
import { ISong } from "../../../interfaces/ISong";

const SongList = (props: { songList: ISong[] }) => {
  return (
    <ol className="song-list">
      {props.songList &&
        props.songList.map((song: ISong, index) => (
          <SongListItem key={index} song={song} index={index} />
        ))}
    </ol>
  );
};

export default SongList;
