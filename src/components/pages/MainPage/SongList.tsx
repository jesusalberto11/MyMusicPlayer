import "../../../styles/pages/SongList.css";
import SongListItem from "./SongListItem";
import { ISong } from "../../../interfaces/ISong";

const SongList = (props: { songList: ISong[]; setCurrentSong: any }) => {
  return (
    <ol className="song-list">
      {props.songList &&
        props.songList.map((song: ISong, index) => (
          <SongListItem
            key={index}
            song={song}
            index={index}
            setCurrentSong={props.setCurrentSong}
          />
        ))}
    </ol>
  );
};

export default SongList;
