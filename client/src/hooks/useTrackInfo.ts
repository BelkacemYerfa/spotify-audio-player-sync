import { useContext } from "react";
import { ILoading, ILyrics, ITrack, ITrackInfo } from "../@types/track";
import { GlobalContext } from "../context/GlobalContext";

type useTracksType = {
  tracks: ITrack[];
  reset: () => void;
  setAllTracks: (track: ITrack) => void;
};

export const useTracks = (): useTracksType => {
  const {
    state: { tracks },
    setAllTracks,
    reset,
  } = useContext(GlobalContext);
  return { reset, tracks, setAllTracks };
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
