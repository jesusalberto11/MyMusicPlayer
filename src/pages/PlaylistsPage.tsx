import "../styles/pages/PlaylistPage/PlaylistsPage.css";
import PageContainer from "../components/layout/PageContainer";
import AddNewPlaylist from "../components/pages/PlaylistsPage/AddNewPlaylist";
import { usePlaylists } from "../hooks/usePlaylists";
import { Link } from "react-router-dom";

const PlaylistsPage = () => {
  const { playlists } = usePlaylists();

  return (
    <PageContainer title="MyPlaylists">
      <div className="playlists-container">
        <AddNewPlaylist />
        {playlists?.map((playlist, index) => (
          <Link
            to={`/playlists/${playlist.id}`}
            key={index}
            className="playlists-item flex centered"
            style={{
              backgroundImage: playlist.cover_image
                ? `url(${playlist.cover_image})`
                : "",
            }}
            replace={true}
          >
            <p className="playlist-name">{playlist.name}</p>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
};

export default PlaylistsPage;
