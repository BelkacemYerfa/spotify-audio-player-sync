import { useState } from "react";
import { PlayMusicBtn } from "../Btns/PlayBtn";
import { Icon } from "../Icons/Icon";
import { ILyrics, ITrack, ITrackInfo } from "../../../@types/track";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import { useLyrics, useTrackInfo } from "../../../hooks/useTrackInfo";
import { ApiRequest } from "../../../static/apiRequest";
import { Link } from "react-router-dom";

interface MusicCardProps {
  title: string;
  author: string;
  src: string;
  releaseDate: string;
  id: string;
  playing: boolean;
}

export const MusicCard = ({
  title,
  author,
  src,
  releaseDate,
  id,
  playing,
}: MusicCardProps) => {
  const { track, setTrackInfo } = useTrackInfo();
  const { lyrics, setLyrics } = useLyrics();
  const {
    data,
    isLoading,
    refetch: getTrackInfo,
  } = useAxios({
    queryKey: "searchResult",
    fetchFunc: async () =>
      axios.request(
        ApiRequest({
          url: "https://spotify23.p.rapidapi.com/tracks/",
          params: {
            ids: id,
          },
        })
      ),
  });
  const getLyrics = async (id: string) => {
    const options = {
      method: "GET",
      url: "https://spotify81.p.rapidapi.com/track_lyrics",
      params: {
        id: id,
      },
      headers: {
        "X-RapidAPI-Key": "27e599f373msh6ff3cf0773d2cc5p10e9bajsnce126f0944c4",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
      },
    };
    return axios.request(options);
  };
  const {
    data: lyricsData,
    isLoading: lyricsIsLoading,
    refetch: getAllLyrics,
  } = useAxios({
    queryKey: "lyrics",
    fetchFunc: () => getLyrics(id),
  });
  return (
    <Link
      to={`/${id}`}
      className="flex justify-between items-center w-full py-[10px] px-4 duration-300 ease-linear cursor-pointer hover:bg-ui-gray-color-three group rounded-md"
      onClick={() => {
        getTrackInfo();
        if (data?.data.tracks[0]) {
          const track: ITrackInfo = {
            id: data?.data.tracks[0].id,
            title_with_featured: data?.data.tracks[0].name,
            song_art_image_thumbnail_url:
              data?.data.tracks[0].album.images[0].url,
            date: data?.data.tracks[0].album.release_date,
            preview_url: data?.data.tracks[0].preview_url,
            playing: false,
            name: data?.data.tracks[0].artists[0].name,
          };
          setTrackInfo(track);
        }
        getAllLyrics();
        if (lyricsData?.data?.lyrics?.lines) {
          setLyrics(lyricsData?.data?.lyrics?.lines);
        } else {
          setLyrics([]);
        }
      }}
    >
      <div className="flex items-center gap-x-5">
        <div className="flex items-center gap-x-2">
          <PlayMusicBtn isPlaying={track.playing} />
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
        {releaseDate}
      </p>
    </Link>
  );
};
