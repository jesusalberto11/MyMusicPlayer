import localforage from "localforage";
import { ISong } from "../interfaces/ISong";
import { IPlaylist } from "../interfaces/IPlaylist";
import { usePlaylistStore } from "../store/PlaylistsStore";

export const usePlaylists = () => {
  const { playlists, setPlaylists } = usePlaylistStore();

  const checkSavedPlaylists = () => {
    localforage
      .getItem("playlists")
      .then((data) => {
        setPlaylists(data as IPlaylist[]);
      })
      .catch((error) => {
        console.error("Error getting playlists from localForage! ", error);
      });
  };

  const createNewPlaylist = (name: string, songs: Array<ISong>) => {
    const newPlaylist: IPlaylist = {
      id: crypto.randomUUID(),
      name: name,
      songs: songs,
      cover_image: songs.length > 0 ? songs[0]?.image : null,
    };

    setPlaylists([...playlists, newPlaylist]);

    localforage.setItem("playlists", [...playlists, newPlaylist]);
  };

  const getPlaylist = async (id: string): Promise<IPlaylist | null> => {
    return new Promise((resolve, reject) => {
      const foundPlaylist = playlists.find((playlist) => playlist.id === id);

      if (foundPlaylist) {
        resolve(foundPlaylist);
      } else {
        reject(new Error("Can't find playlist with that id!"));
      }
    });
  };

  const deletePlaylist = async (id: string) => {
    const foundPlaylist = await getPlaylist(id);

    if (foundPlaylist) {
      const filteredPlaylist = playlists.filter(
        (playlist) => playlist.id !== id
      );

      setPlaylists(filteredPlaylist);
      localforage.setItem("playlists", filteredPlaylist);
    }
  };

  const updatePlaylist = async (id: string | undefined, update: Object) => {
    const playlistIndex = playlists.findIndex((p) => p.id === id);

    if (playlistIndex === -1) return false;

    playlists[playlistIndex] = {
      ...playlists[playlistIndex],
      ...update,
    };

    await localforage.setItem("playlists", playlists);
    setPlaylists([...playlists]);
  };

  return {
    playlists,
    checkSavedPlaylists,
    getPlaylist,
    createNewPlaylist,
    deletePlaylist,
    updatePlaylist,
  };
};
