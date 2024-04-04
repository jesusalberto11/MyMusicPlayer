import { create } from "zustand";
import { IPlaylist } from "../interfaces/IPlaylist";

interface PlaylistStoreState {
  playlists: Array<IPlaylist>;
  setPlaylists: (newPlaylists: Array<IPlaylist>) => void;
}

export const usePlaylistStore = create<PlaylistStoreState>()((set) => ({
  playlists: [],
  setPlaylists: (newPlaylists: Array<IPlaylist>) =>
    set({ playlists: newPlaylists }),
}));
