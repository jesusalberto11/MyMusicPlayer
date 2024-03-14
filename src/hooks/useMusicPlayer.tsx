import { useEffect } from "react";
import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import { audioDir, join } from "@tauri-apps/api/path";
import { Song } from "../interfaces/Song";
import { useMusicPlayerStore } from "../store/MusicPlayerStore";

export const useMusicPlayer = () => {
  const audioPlayerRef = useMusicPlayerStore((state) => state.audioPlayerRef);

  const currentSong = useMusicPlayerStore((state) => state.currentSong);
  const setSong = useMusicPlayerStore((state) => state.setSong);
  const songs = useMusicPlayerStore((state) => state.songs);
  const setSongs = useMusicPlayerStore((state) => state.setSongs);
  const filteredSongs = useMusicPlayerStore((state) => state.filteredSongs);
  const setFilteredSongs = useMusicPlayerStore(
    (state) => state.setFilteredSongs
  );
  const currentSongTime = useMusicPlayerStore((state) => state.currentSongTime);
  const setCurrentSongTime = useMusicPlayerStore(
    (state) => state.setCurrentSongTime
  );
  const currentSongTotalDuration = useMusicPlayerStore(
    (state) => state.currentSongTotalDuration
  );
  const setCurrentSongTotalDuration = useMusicPlayerStore(
    (state) => state.setCurrentSongTotalDuration
  );
  const currentSongPercentaje = useMusicPlayerStore(
    (state) => state.currentSongPercentaje
  );
  const setCurrentSongPercentaje = useMusicPlayerStore(
    (state) => state.setCurrentSongPercentaje
  );
  const currentSongPath = useMusicPlayerStore((state) => state.currentSongPath);
  const setCurrentSongPath = useMusicPlayerStore(
    (state) => state.setCurrentSongPath
  );
  const currentSongIndex = useMusicPlayerStore(
    (state) => state.currentSongIndex
  );
  const setCurrentSongIndex = useMusicPlayerStore(
    (state) => state.setCurrentSongIndex
  );

  const isLoadingSongs = useMusicPlayerStore((state) => state.isLoadingSongs);
  const setIsLoadingSongs = useMusicPlayerStore(
    (state) => state.setIsLoadingSongs
  );

  const isSongPlaying = useMusicPlayerStore((state) => state.isSongPlaying);
  const setIsSongPlaying = useMusicPlayerStore(
    (state) => state.setIsSongPlaying
  );

  useEffect(() => {
    if (audioPlayerRef?.current && isSongPlaying) {
      audioPlayerRef?.current?.play();
      setIsSongPlaying(true);
    }
  }, [currentSong]);

  async function loadSongs() {
    setIsLoadingSongs(true);

    const songListNames: any = await invoke("get_music_items");
    const audioDirPath = await audioDir();
    const parsedSongs: any = await JSON.parse(songListNames);

    parsedSongs.forEach((song: Song) => {
      const formattedSongFileName: string = song.file_name.replace(
        /\.mp3$/,
        ""
      );
      song.file_name = formattedSongFileName;

      if (!song.image) return;
      const filePath: string =
        audioDirPath + `Done/img/${formattedSongFileName}_image.jpg`;
      const musicUrl: string = convertFileSrc(filePath);
      song.image = musicUrl;
    });

    const orderedSongs: any = [...parsedSongs].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    setSongs(orderedSongs);
    setFilteredSongs(orderedSongs);
    setCurrentSongIndex(0);

    console.log("[DONE] - Loaded music correctly.");
    setIsLoadingSongs(false);
  }

  const setPlay = () => {
    if (audioPlayerRef?.current) {
      audioPlayerRef?.current?.play();
      setIsSongPlaying(true);
    }
  };

  const setPause = () => {
    if (audioPlayerRef?.current) {
      audioPlayerRef.current?.pause();
      setIsSongPlaying(false);
    }
  };

  async function setCurrentSong(itemName: string, songIndex: number) {
    const audioDirPath = await audioDir();
    const filePath: string = await join(
      audioDirPath + "Done",
      itemName + ".mp3"
    );
    const musicUrl: string = convertFileSrc(filePath);

    setCurrentSongPath(musicUrl);
    setCurrentSongIndex(songIndex);
    setSong(songs[songIndex]);
    setIsSongPlaying(true);
  }

  function onSongEnd() {
    setCurrentSongIndex(currentSongIndex + 1);
    setCurrentSongPercentaje(0);
    setCurrentSongTime(`0:00`);
    setIsSongPlaying(false);
  }

  const handleSongProgressBarClick = (
    progressWidthValue: number,
    clickedOffsetX: number
  ) => {
    if (audioPlayerRef?.current === null) return;

    const musicDuration = audioPlayerRef.current?.duration || 0;

    if (progressWidthValue !== 0 && musicDuration !== 0) {
      audioPlayerRef.current.currentTime =
        (clickedOffsetX / progressWidthValue) * musicDuration;
    }
  };

  const handleSongCurrentTime = () => {
    const audioDuration: number = audioPlayerRef.current?.currentTime || 0;

    let currentMin: any = Math.floor(audioDuration / 60);
    let currentSec: any = Math.floor(audioDuration % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec.toString()}`;
    }

    const songPercentaje =
      ((audioPlayerRef.current?.currentTime || 0) /
        (audioPlayerRef.current?.duration || 0)) *
        100 || 0;

    setCurrentSongPercentaje(Number(songPercentaje.toFixed(2)));
    setCurrentSongTime(`${currentMin}:${currentSec}`);
  };

  function handleCurrentSongTotalDuration() {
    const audioDuration: number = audioPlayerRef.current?.duration || 0;

    let currentMin: any = Math.floor(audioDuration / 60);
    let currentSec: any = Math.floor(audioDuration % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec.toString()}`;
    }
    setCurrentSongTotalDuration(`${currentMin}:${currentSec}`);
  }

  const filterSongList = (searchText: string) => {
    const filteredSongList = songs.filter((item: Song) =>
      item.title.toLowerCase().includes(searchText)
    );

    setFilteredSongs(filteredSongList);
  };

  return {
    audioPlayerRef,
    setPlay,
    setPause,
    currentSong,
    currentSongPath,
    currentSongIndex,
    currentSongTime,
    currentSongTotalDuration,
    currentSongPercentaje,
    handleSongCurrentTime,
    handleCurrentSongTotalDuration,
    handleSongProgressBarClick,
    songs,
    isSongPlaying,
    isLoadingSongs,
    setCurrentSong,
    onSongEnd,
    filteredSongs,
    filterSongList,
    loadSongs,
  };
};
