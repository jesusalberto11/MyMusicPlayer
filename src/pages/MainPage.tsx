import "../styles/pages/MainPage.css";
import PageContainer from "../components/layout/PageContainer";
import SongList from "../components/pages/MainPage/SongList";
import MainPageHeader from "../components/pages/MainPage/MainPageHeader";
import { Song } from "../interfaces/Song";

const MainPage = (props: {
  filterSongList: any;
  songList: Song[];
  setCurrentSong: any;
}) => {
  return (
    <PageContainer title="MyMusic">
      <MainPageHeader filterSongList={props.filterSongList} />
      <div className="list-container">
        <SongList
          songList={props.songList}
          setCurrentSong={props.setCurrentSong}
        />
      </div>
    </PageContainer>
  );
};

export default MainPage;
