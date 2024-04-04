import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "../hooks/usePlaylists";
import { IPlaylist } from "../interfaces/IPlaylist";
import PageContainerWithBack from "../components/layout/PageContainerWithBack";
import SongList from "../components/pages/MainPage/SongList";

const PlaylistPage = () => {
  const { id } = useParams();
  const { getPlaylist } = usePlaylists();
  const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist | null>(
    null
  );

  useEffect(() => {
    getPlaylist(id ? id : "")
      .then((response) => {
        if (response) {
          setCurrentPlaylist(response);
        }
      })
      .catch((error) => {
        console.error("Error while getting playlist data: ", error);
      });
  }, []);

  return (
    <PageContainerWithBack
      backRoute="/playlists"
      oldRoute="MyPlaylists"
      currentRoute={currentPlaylist?.name}
    >
      {currentPlaylist ? (
        <div className="list-container">
          <SongList songList={currentPlaylist.songs} />
        </div>
      ) : (
        <p>loading</p>
      )}
    </PageContainerWithBack>
  );
};

export default PlaylistPage;
