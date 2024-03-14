import { create } from "zustand";
import { ISong } from "../interfaces/ISong";
import { createRef } from "react";

interface MusicPlayerState {
  audioPlayerRef: React.RefObject<HTMLAudioElement>;

  currentSong: ISong | null;
  setSong: (song: ISong) => void;

  isSongPlaying: boolean;
  setIsSongPlaying: (value: boolean) => void;

  songs: Array<ISong>;
  setSongs: (newSongs: Array<ISong>) => void;

  isLoadingSongs: boolean;
  setIsLoadingSongs: (value: boolean) => void;

  filteredSongs: Array<ISong>;
  setFilteredSongs: (newSongs: Array<ISong>) => void;

  currentSongTime: string | null;
  setCurrentSongTime: (value: string) => void;

  currentSongTotalDuration: string | null;
  setCurrentSongTotalDuration: (value: string) => void;

  currentSongPercentaje: number;
  setCurrentSongPercentaje: (value: number) => void;

  currentSongPath: string | undefined;
  setCurrentSongPath: (value: string) => void;

  currentSongIndex: number;
  setCurrentSongIndex: (value: number) => void;
}

export const useMusicPlayerStore = create<MusicPlayerState>()((set) => ({
  audioPlayerRef: createRef<HTMLAudioElement>(),

  currentSong: null,
  setSong: (song: ISong) => set({ currentSong: song }),

  isSongPlaying: false,
  setIsSongPlaying: (value: boolean) => set({ isSongPlaying: value }),

  filteredSongs: [],
  setFilteredSongs: (newSongs: Array<ISong>) =>
    set({ filteredSongs: newSongs }),

  songs: [],
  setSongs: (newSongs: Array<ISong>) => set({ songs: newSongs }),

  isLoadingSongs: true,
  setIsLoadingSongs: (value: boolean) => set({ isLoadingSongs: value }),

  currentSongTime: null,
  setCurrentSongTime: (value: string) => set({ currentSongTime: value }),

  currentSongTotalDuration: null,
  setCurrentSongTotalDuration: (value: string) =>
    set({ currentSongTotalDuration: value }),

  currentSongPercentaje: 0,
  setCurrentSongPercentaje: (value: number) =>
    set({ currentSongPercentaje: value }),

  currentSongPath: undefined,
  setCurrentSongPath: (value: string) =>
    set({
      currentSongPath: value,
    }),

  currentSongIndex: 0,
  setCurrentSongIndex: (value: number) =>
    set({
      currentSongIndex: value,
    }),
}));
