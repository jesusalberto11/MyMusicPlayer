import "../../../styles/pages/SongList.css";
import { Song } from "../../../interfaces/Song";
import SongListItem from "./SongListItem";

const SongList = (props: { songList: Song[]; setCurrentSong: any }) => {
  return (
    <ol className="song-list">
      {props.songList &&
        props.songList.map((item: Song, index) => (
          <SongListItem
            key={index}
            image={item?.image}
            title={item?.title}
            artist={item?.artist}
            album={item?.album}
            year={item?.year}
            file_name={item?.file_name}
            index={index}
            setCurrentSong={props.setCurrentSong}
          />
        ))}
    </ol>
  );
};

export default SongList;
