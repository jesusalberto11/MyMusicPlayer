import SongImage from "../../songs/SongImage";
import { useMusicPlayer } from "../../../hooks/useMusicPlayer";
import { ISong } from "../../../interfaces/ISong";

const SongListItem = (props: { song: ISong; index: number }) => {
  const { setCurrentSong } = useMusicPlayer();

  const checkForItem = (item: any, type: string) => {
    return item ? item : `Unknown ${type}`;
  };

  return (
    <li
      className="song-list-item"
      onClick={() => setCurrentSong(props?.song, Number(props.index))}
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
