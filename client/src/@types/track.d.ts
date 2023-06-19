export interface ITrack {
  id: number;
  song_art_image_thumbnail_url: string;
  title_with_featured: string;
  date: string;
  name: string;
  playing: boolean;
}

export interface ITrackStream {
  url?: string;
  format?: string;
}

export interface ILyrics {
  startMs: number;
  durMs: number;
  text: string;
}
