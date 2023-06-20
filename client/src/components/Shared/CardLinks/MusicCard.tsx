import { useState } from "react";
import { PlayMusicBtn } from "../Btns/PlayBtn";
import { Icon } from "../Icons/Icon";
import { ILyrics, ITrack } from "../../../@types/track";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";

interface MusicCardProps {
  title: string;
  author: string;
  src: string;
  releasedate: string;
  id: string;
  playing: boolean;
  tracks: ITrack[];
  setCurrentTrackInfo: (currentTrack: ITrack) => void;
  setPreviewUrl: (preview_url: string) => void;
  setLyrics: (lyrics: ILyrics[]) => void;
}

export const MusicCard = ({
  title,
  author,
  src,
  releasedate,
  id,
  playing,
  tracks,
  setCurrentTrackInfo,
  setPreviewUrl,
  setLyrics,
}: MusicCardProps) => {
  const getSearchResult = async (params: string) => {
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/tracks/",
      params: {
        ids: params,
      },
      headers: {
        "X-RapidAPI-Key": "f2c6eaf49amsh085b646d7d6f035p1ceea8jsnb488d2695adc",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    return axios.request(options);
  };
  const { data, isLoading, refetch } = useAxios({
    queryKey: "searchResult",
    fetchFunc: () => getSearchResult(id.toString()),
  });
  const getLyrics = async (id: string) => {
    const options = {
      method: "GET",
      url: "https://spotify-scraper.p.rapidapi.com/v1/track/lyrics",
      params: {
        trackId: id,
        format: "json",
      },
      headers: {
        "X-RapidAPI-Key": "f2c6eaf49amsh085b646d7d6f035p1ceea8jsnb488d2695adc",
        "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
      },
    };
    return axios.request(options);
  };
  const {
    data: lyricsData,
    isLoading: lyricsIsLoading,
    refetch: lyricsRefetch,
  } = useAxios({
    queryKey: "lyrics",
    fetchFunc: () => getLyrics(id.toString()),
  });
  console.log(lyricsData?.data);
  return (
    <div
      id={id.toString()}
      className="flex justify-between items-center w-full py-[10px] px-4 duration-300 ease-linear cursor-pointer hover:bg-ui-gray-color-three group rounded-md"
      onClick={() => {
        const currentIndexTrack = tracks.findIndex((item) => {
          return item.id === id && !playing;
        });
        refetch();
        lyricsRefetch();
        setLyrics(lyricsData?.data);

        setPreviewUrl(data?.data?.tracks[0]?.preview_url);
        setCurrentTrackInfo(tracks[currentIndexTrack]);
      }}
    >
      <div className="flex items-center gap-x-5">
        <div className="flex items-center gap-x-2">
          <PlayMusicBtn isPlaying={playing} />
          <img
            src={src}
            className="w-[52px] h-[52px]"
            height={52}
            width={52}
            alt={title}
          />
          <div className="flex flex-col">
            <h4 className="text-xl text-white tracking-[0.01em] font-[450] truncate max-w-[150px]">
              {title}
            </h4>
            <p className="text-base text-sub_title_color tracking-[0.01em] font-[450] truncate max-w-[150px]">
              {author}
            </p>
          </div>
        </div>
      </div>
      <p className="text-lg/[23px] text-sub_title_color font-[450]">
        {releasedate}
      </p>
    </div>
  );
};
