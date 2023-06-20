import { useContext } from "react";
import { ILyrics, ITrack, ITrackInfo } from "../@types/track";
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
