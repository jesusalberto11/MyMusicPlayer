import { ILyrics } from "./ILyrics";

export interface ISong {
  id: string;
  title: string;
  image: string;
  album: string;
  artist: string;
  file_name: string;
  file_url: string;
  lyrics: Array<ILyrics>;
  genres: Array<string>;
  year: number;
}
