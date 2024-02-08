import { useEffect, useRef, useState } from "react";
import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import { audioDir, join } from "@tauri-apps/api/path";
import { Song } from "../interfaces/Song";

export const useMusicPlayer = () => {
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [currentSongPath, setCurrentSongPath] = useState("");
  const [currentSongData, setCurrentSongData] = useState({});
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songList, setSongsList] = useState([]);
  const [currentSongTotalDuration, setCurrentSongTotalDuration] = useState("");
  const [currentSongTime, setCurrentSongTime] = useState("");
  const [currentSongPercentaje, setCurrentSongPercentaje] = useState(0);

  useEffect(() => {
    loadSongs();
  }, []);

  useEffect(() => {
    setCurrentSongPercentaje(0);
    audioPlayerRef?.current?.play();
  }, [currentSongPath]);

  useEffect(() => {
    //setCurrentSongByIndex(currentSongIndex);
    setCurrentSongData(songList[currentSongIndex]);

    //AUTOPLAY
    // setCurrentSongPercentaje(0);
    // audioPlayerRef?.current?.play();
  }, [currentSongIndex]);

  async function loadSongs() {
    const songListNames: any = await invoke("get_music_items");
    const audioDirPath = await audioDir();
    const parsedSongs: any = await JSON.parse(songListNames);
    console.log(parsedSongs);

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

    setSongsList(parsedSongs);
    setCurrentSongIndex(0);

    console.log("[DONE] - Loaded music correctly.");
  }

  async function setCurrentSong(itemName: string, songIndex: number) {
    const audioDirPath = await audioDir();
    const filePath: string = await join(
      audioDirPath + "Done",
      itemName + ".mp3"
    );
    const musicUrl: string = convertFileSrc(filePath);

    setCurrentSongPath(musicUrl);
    setCurrentSongIndex(songIndex);
    setCurrentSongData(songList[songIndex]);
  }

  async function setCurrentSongByIndex(songIndex: number) {
    // const audioDirPath = await audioDir();
    // const filePath: string = await join(
    //   audioDirPath + "Done",
    //   songList[songIndex]
    // );
    // const musicUrl: string = convertFileSrc(filePath);
    // setCurrentSongPath(musicUrl);
  }

  function onSongEnd() {
    setCurrentSongIndex((currentSongIndex) => currentSongIndex + 1);
    setCurrentSongPercentaje(0);
  }

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

  return {
    audioPlayerRef,
    currentSongData,
    currentSongPath,
    currentSongIndex,
    currentSongTime,
    currentSongTotalDuration,
    currentSongPercentaje,
    handleSongCurrentTime,
    handleCurrentSongTotalDuration,
    songList,
    setCurrentSong,
    onSongEnd,
  };
};
