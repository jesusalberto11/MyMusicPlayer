import "../styles/pages/PlaylistPage/PlaylistPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePlaylists } from "../hooks/usePlaylists";
import { IPlaylist } from "../interfaces/IPlaylist";
import PageContainerWithBack from "../components/layout/PageContainerWithBack";
import SongList from "../components/pages/MainPage/SongList";
import SimpleButton from "../components/shared/SimpleButton";
import { SVG_ICONS } from "../helpers/svgIcons";
import ConfirmDialog from "../components/shared/ConfirmDialog";
import SVGIcon from "../components/shared/SVGIcon";

const PlaylistPage = () => {
  const navigate = useNavigate();
  const configDialogRef = useRef<HTMLDialogElement | null>(null);
  const confirmDialogRef = useRef<any>();

  const { id } = useParams();
  const { getPlaylist, updatePlaylist, deletePlaylist } = usePlaylists();
  const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist | null>(
    null
  );
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");

  useEffect(() => {
    handleGetPlaylist(id ? id : "");
  }, []);

  const handleGetPlaylist = (id: string) => {
    getPlaylist(id ? id : "")
      .then((response) => {
        if (response) {
          setCurrentPlaylist(response);
        }
      })
      .catch((error) => {
        navigate("/playlists");
        console.error("Error while getting playlist data: ", error);
      });
  };

  const handleDelete = () => {
    deletePlaylist(id ? id : "");
    navigate("/playlists");
    configDialogRef.current?.close();
  };

  const handlePlaylistNameChange = (e: any) => {
    e.preventDefault();

    const newName = { name: newPlaylistName };

    updatePlaylist(currentPlaylist?.id, newName);
    handleGetPlaylist(currentPlaylist?.id ? currentPlaylist?.id : "");
  };

  return (
    <PageContainerWithBack
      backRoute="/playlists"
      oldRoute="MyPlaylists"
      currentRoute={currentPlaylist?.name}
      openMenu={() => configDialogRef?.current?.showModal()}
    >
      {currentPlaylist ? (
        <div className="list-container">
          <SongList songList={currentPlaylist.songs} />
        </div>
      ) : (
        <p>loading</p>
      )}
      <dialog ref={configDialogRef} className="simple-dialog">
        <div className="edit-playlist-dialog-container">
          <div className="edit-playlist-dialog-header">
            <p>Edit playlist</p>
            <SimpleButton
              showTitle={false}
              title="Close options"
              icon={SVG_ICONS.CLOSE}
              onClickItem={() => configDialogRef.current?.close()}
            />
          </div>
          <label htmlFor="new-playlist-name">Change playlist name</label>
          <form
            onSubmit={handlePlaylistNameChange}
            className="update-form flex centered"
          >
            <input
              className="add-new-playlist-input"
              id="new-playlist-name"
              type="text"
              placeholder={currentPlaylist?.name}
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              autoFocus
              required
            />
            <button
              className="update-playlist-btn flex centered"
              type="submit"
              role="button"
              disabled={
                newPlaylistName === "" ||
                newPlaylistName === null ||
                newPlaylistName === undefined ||
                currentPlaylist?.name === newPlaylistName
              }
            >
              <SVGIcon icon={SVG_ICONS.COMPLETE} />
            </button>
          </form>
          <hr />
          <SimpleButton
            showTitle={true}
            title="Delete playlist"
            icon={SVG_ICONS.TRASH}
            onClickItem={() => confirmDialogRef.current?.openDialog()}
          />
          <ConfirmDialog ref={confirmDialogRef} action={handleDelete} />
        </div>
      </dialog>
    </PageContainerWithBack>
  );
};

export default PlaylistPage;
