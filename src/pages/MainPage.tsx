import "../styles/pages/MainPage.css";
import PageContainer from "../components/layout/PageContainer";
import { Song } from "../interfaces/Song";
import SongList from "../components/pages/MainPage/SongList";

const MainPage = (props: { songList: Song[]; setCurrentSong: any }) => {
  return (
    <PageContainer>
      <div className="main-page-header">
        <h1>MyMusic</h1>
      </div>
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
