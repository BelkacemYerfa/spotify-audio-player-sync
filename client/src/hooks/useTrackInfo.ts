import { useContext } from "react";
import { ILoading, ILyrics, ITrack, ITrackInfo } from "../@types/track";
import { GlobalContext } from "../context/GlobalContext";

type useTracksType = {
  tracks: ITrack[];
  setNewTracks: (tracks: ITrack[]) => void;
  setAllTracks: (track: ITrack) => void;
};

export const useTracks = (): useTracksType => {
  const {
    state: { tracks },
    setAllTracks,
    setNewTracks,
  } = useContext(GlobalContext);
  return { setNewTracks, tracks, setAllTracks };
};

type useTrackInfoType = {
  track: ITrackInfo;
  setTrackInfo: (track: ITrackInfo) => void;
};

export const useTrackInfo = (): useTrackInfoType => {
  const {
    state: { track },
    setTrackInfo,
  } = useContext(GlobalContext);
  return { track, setTrackInfo };
};

type useLyricsType = {
  lyrics: ILyrics[];
  setLyrics: (lyrics: ILyrics[]) => void;
};

export const useLyrics = (): useLyricsType => {
  const {
    state: { lyrics },
    setLyrics,
  } = useContext(GlobalContext);
  return { lyrics, setLyrics };
};

type useLoadingType = {
  isLoading: ILoading;
  setIsLoading: (loading: ILoading) => void;
};

export const useLoading = (): useLoadingType => {
  const {
    state: { isLoading },
    setIsLoading,
  } = useContext(GlobalContext);
  return { isLoading, setIsLoading };
};

type useCurrentLyricType = {
  currentLyric: ILyrics;
  setCurrentLyric: (lyric: ILyrics) => void;
};

export const useCurrentLyric = (): useCurrentLyricType => {
  const {
    state: { SelectedLyric: currentLyric },
    setCurrentLyric,
  } = useContext(GlobalContext);
  return { currentLyric, setCurrentLyric };
};
