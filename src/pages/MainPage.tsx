import "../styles/pages/MainPage.css";
import PageContainer from "../components/layout/PageContainer";
import { Song } from "../interfaces/Song";
import SongList from "../components/pages/MainPage/SongList";

const MainPage = (props: { songList: Song[]; setCurrentSong: any }) => {
  return (
    <PageContainer title="MyMusic">
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
