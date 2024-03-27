import { Song } from "../../../interfaces/Song";
import SongImage from "../../songs/SongImage";

const SongListItem = (props: {
  song: Song;
  index: number;
  setCurrentSong: any;
}) => {
  const checkForItem = (item: any, type: string) => {
    return item ? item : `Unknown ${type}`;
  };

  return (
    <li
      className="song-list-item"
      onClick={() =>
        props.setCurrentSong(props?.song.file_url, Number(props.index))
      }
    >
      <SongImage imageSrc={props?.song.image} />
      <p>{checkForItem(props?.song.title, "title")}</p>
      <p>{checkForItem(props?.song.artist, "artist")}</p>
      <p>{checkForItem(props?.song.album, "album")}</p>
      <p>{checkForItem(props?.song.year, "year")}</p>
    </li>
  );
};

export default SongListItem;
