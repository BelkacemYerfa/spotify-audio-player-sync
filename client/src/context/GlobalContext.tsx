import { ReactElement, createContext, useCallback, useReducer } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ILyrics, ITrack, ITrackInfo } from "../@types/track";
import { Loader } from "../components/Shared/Loaders/Loader";
import useAxios from "../hooks/useAxios";

interface IStateType {
  lyrics: ILyrics[];
  tracks: ITrack[];
  track: ITrackInfo;
}

export let initialState: IStateType = {
  lyrics: [],
  tracks: [],
  track: {
    id: "",
    title_with_featured: "",
    song_art_image_thumbnail_url: "",
    name: "",
    playing: false,
    preview_url: "",
    date: "",
  },
};

const enum REDUCER_ACTIONS {
  SET_TRACK_LYRICS,
  SET_TRACK_INFO,
  SET_ALL_TRACKS,
}

type Reducer_Action = {
  type: REDUCER_ACTIONS;
  payload: ILyrics[] | ITrack | ITrackInfo;
};

const reducer = (state: IStateType, action: Reducer_Action): IStateType => {
  switch (action.type) {
    case REDUCER_ACTIONS.SET_TRACK_LYRICS:
      return { ...state, lyrics: action.payload as ILyrics[] };
    case REDUCER_ACTIONS.SET_ALL_TRACKS:
      return { ...state, tracks: [...state.tracks, action.payload as ITrack] };
    case REDUCER_ACTIONS.SET_TRACK_INFO:
      return { ...state, track: action.payload as ITrackInfo };
    default:
      throw new Error();
  }
};

type ChildrenType = {
  children: ReactElement;
};

const useGlobalProvider = (initialState: IStateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setLyrics = useCallback((lyrics: ILyrics[]) => {
    dispatch({ type: REDUCER_ACTIONS.SET_TRACK_LYRICS, payload: lyrics });
  }, []);
  const setAllTracks = useCallback(
    (track: ITrack) =>
      dispatch({
        type: REDUCER_ACTIONS.SET_ALL_TRACKS,
        payload: track,
      }),
    []
  );

  return { state, setAllTracks, setLyrics };
};

type GlobalContextType = ReturnType<typeof useGlobalProvider>;

const initialContextState: GlobalContextType = {
  state: initialState,
  setAllTracks: () => {},
  setLyrics: () => {},
};

export const GlobalContext =
  createContext<GlobalContextType>(initialContextState);

export const GlobalProvider = ({
  children,
  ...initialState
}: ChildrenType & IStateType): ReactElement => {
  const { state, setAllTracks, setLyrics } = useGlobalProvider(initialState);
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/search/",
    params: {
      q: "eminem",
      type: "multi",
      offset: "0",
      limit: "10",
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": "8d6796a13fmsh5b6b09d9f9ca34ep1262acjsnbbd1102f05aa",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const { data, isLoading } = useAxios({
    queryKey: "initialTracks",
    fetchFunc: async () => axios.request(options),
  });
  const formatTime = (time: number) => {
    const min = Math.floor(time / 60000);
    const sec = ((time % 60000) / 1000).toFixed(0);
    return min + ":" + (parseInt(sec) < 10 ? "0" : "") + sec;
  };
  useEffect(() => {
    if (data?.data.tracks) {
      console.log(data?.data.tracks);
      data?.data?.tracks?.items?.map((item: any) => {
        const result: ITrack = {
          id: item.data.id,
          song_art_image_thumbnail_url:
            item.data.albumOfTrack.coverArt.sources[0].url,
          title_with_featured: item.data.name,
          date: formatTime(item.data.duration.totalMilliseconds).toString(),
          name: item.data.artist?.items[0].profile.name,
          playing: false,
        };
        setAllTracks(result);
      });
    }
  }, [data]);
  if (isLoading) return <Loader />;
  return (
    <GlobalContext.Provider value={{ setAllTracks, state, setLyrics }}>
      {children}
    </GlobalContext.Provider>
  );
};
