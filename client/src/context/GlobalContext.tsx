import { ReactElement, createContext, useCallback, useReducer } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ILoading, ILyrics, ITrack, ITrackInfo } from "../@types/track";
import { Loader } from "../components/Shared/Loaders/Loader";
import useAxios from "../hooks/useAxios";
import { ApiRequest } from "../static/apiRequest";
import timeFormater from "../static/timeFormater";

interface IStateType {
  lyrics: ILyrics[];
  tracks: ITrack[];
  track: ITrackInfo;
  isLoading: ILoading;
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
  isLoading: {
    loading: false,
  },
};

const enum REDUCER_ACTIONS {
  SET_TRACK_LYRICS,
  SET_TRACK_INFO,
  SET_ALL_TRACKS,
  RESET,
  SET_LOADER_SEARCH,
}

type Reducer_Action = {
  type: REDUCER_ACTIONS;
  payload: ILyrics[] | ITrack | ITrackInfo | ILoading;
};

const reducer = (state: IStateType, action: Reducer_Action): IStateType => {
  switch (action.type) {
    case REDUCER_ACTIONS.SET_TRACK_LYRICS:
      return { ...state, lyrics: action.payload as ILyrics[] };
    case REDUCER_ACTIONS.SET_ALL_TRACKS:
      return { ...state, tracks: [...state.tracks, action.payload as ITrack] };
    case REDUCER_ACTIONS.RESET:
      return {
        ...state,
        tracks: [],
      };
    case REDUCER_ACTIONS.SET_TRACK_INFO:
      return { ...state, track: action.payload as ITrackInfo };
    case REDUCER_ACTIONS.SET_LOADER_SEARCH:
      return { ...state, isLoading: action.payload as ILoading };
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
  const reset = useCallback(() => {
    dispatch({
      type: REDUCER_ACTIONS.RESET,
      payload: initialState.track,
    });
  }, []);
  const setTrackInfo = useCallback((track: ITrackInfo) => {
    dispatch({
      type: REDUCER_ACTIONS.SET_TRACK_INFO,
      payload: track,
    });
  }, []);

  const setIsLoading = useCallback((loading: ILoading) => {
    dispatch({
      type: REDUCER_ACTIONS.SET_TRACK_INFO,
      payload: loading,
    });
  }, []);
  return { state, setAllTracks, setLyrics, reset, setTrackInfo, setIsLoading };
};

type GlobalContextType = ReturnType<typeof useGlobalProvider>;

const initialContextState: GlobalContextType = {
  state: initialState,
  setAllTracks: () => {},
  setLyrics: () => {},
  reset: () => {},
  setTrackInfo: () => {},
  setIsLoading: () => {},
};

export const GlobalContext =
  createContext<GlobalContextType>(initialContextState);

export const GlobalProvider = ({
  children,
  ...initialState
}: ChildrenType & IStateType): ReactElement => {
  const { state, setAllTracks, setLyrics, reset, setTrackInfo, setIsLoading } =
    useGlobalProvider(initialState);
  const { data, isLoading } = useAxios({
    queryKey: "initialTracks",
    fetchFunc: async () =>
      axios.request(
        ApiRequest({
          url: "https://spotify23.p.rapidapi.com/search/",
          params: {
            q: "Hello",
            type: "multi",
            offset: "0",
            limit: "20",
            numberOfTopResults: "5",
          },
        })
      ),
  });
  useEffect(() => {
    if (data?.data?.tracks) {
      console.log(data?.data?.tracks);
      data?.data?.tracks?.items?.map((item: any) => {
        const result: ITrack = {
          id: item.data.id,
          song_art_image_thumbnail_url:
            item.data.albumOfTrack.coverArt.sources[0].url,
          title_with_featured: item.data.name,
          date: String(timeFormater(item.data.duration.totalMilliseconds)),
          name: item.data.artists.items[0].profile.name,
          playing: false,
        };
        setAllTracks(result);
      });
    }
  }, [data]);
  if (isLoading) return <Loader height={130} width={130} />;
  return (
    <GlobalContext.Provider
      value={{
        setAllTracks,
        state,
        setLyrics,
        reset,
        setTrackInfo,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
