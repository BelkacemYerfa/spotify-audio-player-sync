export interface ITrack {
  id: string;
  song_art_image_thumbnail_url: string;
  title_with_featured: string;
  date: string;
  name: string;
  playing: boolean;
}

export interface ITrackInfo extends ITrack {
  preview_url: string;
}

export interface ITrackStream {
  url?: string;
  format?: string;
}

export interface ILyrics {
  startTimeMs: string;
  words: string;
}

export interface ILoading {
  loading: boolean;
}
