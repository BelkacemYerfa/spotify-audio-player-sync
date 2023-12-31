import { FormEvent, useEffect, useRef, useState } from "react";
import { Icon } from "../Shared/Icons/Icon";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { ITrack } from "../../@types/track";
import { useLoading, useTracks } from "../../hooks/useTrackInfo";
import { ApiRequest } from "../../static/apiRequest";
import timeFormater from "../../static/timeFormater";
import { useDebounce } from "../../hooks/useDebounce";

export const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const debounceValue = useDebounce(query, 500);
  const { setNewTracks } = useTracks();
  const { setIsLoading } = useLoading();
  const {
    data,
    isLoading: TracksLoading,
    refetch: getNewTracks,
  } = useAxios({
    queryKey: "search",
    fetchFunc: async () =>
      axios.request(
        ApiRequest({
          url: "https://spotify23.p.rapidapi.com/search/",
          params: {
            q: query ?? "Jasmine",
            type: "multi",
            offset: "0",
            limit: "15",
            numberOfTopResults: "5",
          },
        })
      ),
  });
  const submitForm = async () => {
    console.log(query);
    let results: ITrack[] = [];
    await getNewTracks();
    if (data?.data.tracks.items) {
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
        results.push(result);
      });
      setNewTracks(results);
    }
  };
  useEffect(() => {
    if (debounceValue) {
      submitForm();
    }
  }, [debounceValue]);
  useEffect(() => {
    setIsLoading({
      loading: TracksLoading,
    });
    console.log(TracksLoading);
  }, [TracksLoading]);
  return (
    <form className=" w-full flex justify-center p-2">
      <div className="relative w-full h-fit flex items-center justify-center gap-x-2 px-2 py-3 bg-search_bar_background rounded-3xl">
        <div className="absolute left-4 h-7 w-7 inset-0 my-auto">
          <Icon
            height={24}
            width={24}
            fill="#fff"
            opacity={1}
            path="M20.75 10.75C20.75 14.8921 17.3921 18.25 13.25 18.25C9.10786 18.25 5.75 14.8921 5.75 10.75C5.75 6.60786 9.10786 3.25 13.25 3.25C17.3921 3.25 20.75 6.60786 20.75 10.75ZM23.25 10.75C23.25 16.2728 18.7728 20.75 13.25 20.75C10.9391 20.75 8.8113 19.9661 7.11795 18.6498L2.88388 22.8839C2.39573 23.372 1.60427 23.372 1.11612 22.8839C0.627961 22.3957 0.627961 21.6043 1.11612 21.1161L5.35018 16.8821C4.03385 15.1887 3.25 13.0609 3.25 10.75C3.25 5.22715 7.72715 0.75 13.25 0.75C18.7728 0.75 23.25 5.22715 23.25 10.75Z"
          />
        </div>
        <input
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full outline-none bg-search_bar_background indent-10"
        />
      </div>
    </form>
  );
};
