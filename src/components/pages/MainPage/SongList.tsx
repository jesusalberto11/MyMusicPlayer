import { Song } from "../../../interfaces/Song";

const SongList = (props: { songList: Song[]; setCurrentSong: any }) => {
  return (
    <ol className="song-list">
      {props.songList &&
        props.songList.map((item: Song, index) => (
          <li
            key={index}
            className="song-list-item"
            onClick={() => props.setCurrentSong(item?.file_name, Number(index))}
          >
            <img src={item?.image} className="song-list-item-img" />
            <p>{item?.title}</p>
            <p>{item?.artist}</p>
            <p>{item?.album}</p>
            <p>{item?.year}</p>
          </li>
        ))}
    </ol>
  );
};

export default SongList;
