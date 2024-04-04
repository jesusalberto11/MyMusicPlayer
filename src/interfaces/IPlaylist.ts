import { ISong } from "./ISong";

export interface IPlaylist {
  id: string;
  name: string;
  songs: Array<ISong>;
  cover_image: string | null;
}
