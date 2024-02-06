import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import MusicPlayer from "./components/music player/MusicPlayer";
import { useMusicPlayer } from "./hooks/useMusicPlayer";
import MainPage from "./pages/MainPage";

function App() {
  const {
    audioPlayerRef,
    currentSongData,
    currentSongPath,
    currentSongTotalDuration,
    handleSongCurrentTime,
    currentSongTime,
    currentSongPercentaje,
    songList,
    onSongEnd,
    setCurrentSong,
    handleCurrentSongTotalDuration,
  } = useMusicPlayer();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
        <MainPage songList={songList} setCurrentSong={setCurrentSong} />
      </div>
      {currentSongPath !== "" && (
        <audio
          ref={audioPlayerRef}
          id="main-audio"
          src={currentSongPath}
          onEnded={onSongEnd}
          onLoadedData={handleCurrentSongTotalDuration}
          onTimeUpdate={handleSongCurrentTime}
        ></audio>
      )}
      <MusicPlayer
        currentSongData={currentSongData}
        currentSongTime={currentSongTime}
        currentSongTotalDuration={currentSongTotalDuration}
        currentSongPercentaje={currentSongPercentaje}
      />
    </div>
  );
}

export default App;
