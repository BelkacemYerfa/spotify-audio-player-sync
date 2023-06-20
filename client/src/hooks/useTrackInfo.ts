import { useContext } from "react";
import { ITrack } from "../@types/track";
import { GlobalContext } from "../context/GlobalContext";

type useTracksType = {
  tracks: ITrack[];
  setAllTracks: (track: ITrack) => void;
};

export const useTracks = (): useTracksType => {
  const {
    state: { tracks },
    setAllTracks,
  } = useContext(GlobalContext);
  return { tracks, setAllTracks };
};
