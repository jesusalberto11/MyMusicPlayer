import SongImage from "../../songs/SongImage";

const SongListItem = (props: {
  title: string;
  image: string;
  artist: string;
  album: string;
  year: number;
  file_name: string;
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
        props.setCurrentSong(props?.file_name, Number(props.index))
      }
    >
      <SongImage imageSrc={props?.image} />
      <p>{checkForItem(props?.title, "title")}</p>
      <p>{checkForItem(props?.artist, "artist")}</p>
      <p>{checkForItem(props?.album, "album")}</p>
      <p>{checkForItem(props?.year, "year")}</p>
    </li>
  );
};

export default SongListItem;
