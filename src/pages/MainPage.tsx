import "../styles/pages/MainPage.css";
import PageContainer from "../components/layout/PageContainer";
import SongList from "../components/pages/MainPage/SongList";
import MainPageHeader from "../components/pages/MainPage/MainPageHeader";
import { useMusicPlayer } from "../hooks/useMusicPlayer";

const MainPage = () => {
  const { filteredSongs, filterSongList } = useMusicPlayer();

  return (
    <PageContainer title="MyMusic">
      <MainPageHeader filterSongList={filterSongList} />
      <div className="list-container">
        <SongList songList={filteredSongs} />
      </div>
    </PageContainer>
  );
};

export default MainPage;
