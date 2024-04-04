import "../../../styles/pages/PlaylistPage/AddNewPlaylist.css";
import { useRef, useState } from "react";
import SimpleButton from "../../shared/SimpleButton";
import { ISong } from "../../../interfaces/ISong";
import { SVG_ICONS } from "../../../helpers/svgIcons";
import { useMusicPlayer } from "../../../hooks/useMusicPlayer";
import { usePlaylists } from "../../../hooks/usePlaylists";
import { useTranslation } from "react-i18next";

const AddNewPlaylist = () => {
  const [t] = useTranslation("global");
  const { songs } = useMusicPlayer();
  const { createNewPlaylist } = usePlaylists();

  const newPlaylistDialogRef = useRef<HTMLDialogElement | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [newPlaylistSongs, setNewPlayslistSongs] = useState<Array<ISong>>([]);

  const onSubmitForm = (e: any) => {
    e.preventDefault();

    handleCreatePlaylist();
  };

  const addSongToPlaylist = (selectedSong: ISong) => {
    if (newPlaylistSongs.includes(selectedSong)) {
      setNewPlayslistSongs(
        newPlaylistSongs.filter((song) => song !== selectedSong)
      );
    } else {
      setNewPlayslistSongs([...newPlaylistSongs, selectedSong]);
    }
  };

  const handleCreatePlaylist = () => {
    createNewPlaylist(newPlaylistName, newPlaylistSongs);

    setNewPlaylistName("");
    setNewPlayslistSongs([]);

    newPlaylistDialogRef?.current?.close();
  };

  return (
    <>
      <button
        className="add-new-playlist flex centered"
        onClick={() => newPlaylistDialogRef?.current?.showModal()}
      >
        {t("PLAYLISTS.CREATE-PLAYLIST")}
      </button>
      <dialog ref={newPlaylistDialogRef} className="simple-dialog">
        <div className="add-new-playlist-dialog-content">
          <form onSubmit={onSubmitForm} className="add-new-playlist-form flex">
            <div className="add-new-playlist-dialog-header">
              <label htmlFor="playlist-name">
                {t("PLAYLISTS.CREATE-PLAYLIST")}
              </label>
              <SimpleButton
                showTitle={false}
                title="Close Dialog"
                icon={SVG_ICONS.CLOSE}
                onClickItem={() => newPlaylistDialogRef?.current?.close()}
              />
            </div>
            <input
              className="add-new-playlist-input"
              id="playlist-name"
              type="text"
              placeholder={t("PLAYLISTS.PLAYLIST-NAME-PLACEHOLDER")}
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              autoFocus
              required
            />
            <hr />
            <div className="select-songs-for-playlist-container">
              <div className="select-song-container">
                {songs.map((song: ISong, index) => (
                  <label
                    htmlFor={song.title}
                    key={index}
                    className="select-song-item"
                  >
                    <input
                      id={song.title}
                      type="checkbox"
                      checked={newPlaylistSongs.includes(song)}
                      onChange={() => addSongToPlaylist(song)}
                    />
                    {song.title}
                  </label>
                ))}
              </div>
              <hr />
            </div>
            <button type="submit" className="create-playlist-btn">
              {t("PLAYLISTS.CREATE-BUTTON")}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddNewPlaylist;
