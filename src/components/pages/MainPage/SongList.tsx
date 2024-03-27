import "../../../styles/pages/SongList.css";
import { Song } from "../../../interfaces/Song";
import SongListItem from "./SongListItem";

const SongList = (props: { songList: Song[]; setCurrentSong: any }) => {
  return (
    <ol className="song-list">
      {props.songList &&
        props.songList.map((song: Song, index) => (
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
