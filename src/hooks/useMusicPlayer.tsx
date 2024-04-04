import { useEffect } from "react";
import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import { audioDir } from "@tauri-apps/api/path";
import { ISong } from "../interfaces/ISong";
import { useMusicPlayerStore } from "../store/MusicPlayerStore";

export const useMusicPlayer = () => {
  const {
    audioPlayerRef,
    currentSong,
    setSong,
    songs,
    setSongs,
    filteredSongs,
    setFilteredSongs,
    currentSongTime,
    setCurrentSongTime,
    currentSongTotalDuration,
    setCurrentSongTotalDuration,
    currentSongPercentaje,
    setCurrentSongPercentaje,
    currentSongPath,
    setCurrentSongPath,
    currentSongIndex,
    setCurrentSongIndex,
    isLoadingSongs,
    setIsLoadingSongs,
    isSongPlaying,
    setIsSongPlaying,
  } = useMusicPlayerStore();

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

    parsedSongs.forEach((song: ISong) => {
      const formattedSongFileName: string = song.file_name.replace(
        /\.mp3$/,
        ""
      );
      song.file_name = formattedSongFileName;

      const filePath: string = audioDirPath + "Done/" + song.file_name + ".mp3";
      song.file_url = convertFileSrc(filePath);

      if (!song.image) return;

      const songImgFilePath: string =
        audioDirPath + `Done/img/${formattedSongFileName}_image.jpg`;

      song.image = convertFileSrc(songImgFilePath);
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

  async function setCurrentSong(song: ISong, songIndex: number) {
    setCurrentSongPath(song.file_url);
    setCurrentSongIndex(songIndex);
    setSong(song);
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
    const filteredSongList = songs.filter((item: ISong) =>
      item.title.toLowerCase().includes(searchText)
    );

    setFilteredSongs(filteredSongList);
  };

  const getPlayerVolume = () => {
    if (audioPlayerRef?.current) {
      return audioPlayerRef.current.volume;
    }
  };

  const changePlayerVolume = (newVolume: number) => {
    if (audioPlayerRef?.current) {
      audioPlayerRef.current.volume = newVolume;
    }
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
    getPlayerVolume,
    changePlayerVolume,
  };
};
