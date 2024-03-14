import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import MusicPlayer from "./components/music player/MusicPlayer";
import { Outlet } from "react-router-dom";
import { useMusicPlayer } from "./hooks/useMusicPlayer";
import { useEffect } from "react";

function App() {
  const {
    audioPlayerRef,
    loadSongs,
    currentSong,
    currentSongPath,
    handleSongCurrentTime,
    onSongEnd,
    handleCurrentSongTotalDuration,
  } = useMusicPlayer();

  useEffect(() => {
    loadSongs();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
      {currentSong !== null && (
        <audio
          ref={audioPlayerRef}
          id="main-audio"
          src={currentSongPath}
          onEnded={onSongEnd}
          onLoadedData={handleCurrentSongTotalDuration}
          onTimeUpdate={handleSongCurrentTime}
        ></audio>
      )}
      <MusicPlayer />
    </div>
  );
}

export default App;
