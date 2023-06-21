import { useEffect, useRef, useState } from "react";
import {
  useCurrentLyric,
  useLoading,
  useLyrics,
  useTrackInfo,
} from "../hooks/useTrackInfo";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Shared/Loaders/Loader";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import { ApiRequest } from "../static/apiRequest";
import { ILyrics, ITrackInfo } from "../@types/track";
import timeFormater from "../static/timeFormater";

interface LyricsProps {
  playing: boolean;
}

export const Lyrics = ({ playing }: LyricsProps) => {
  const { trackId } = useParams();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);
  const { track, setTrackInfo } = useTrackInfo();
  const { lyrics: dataLyric, setLyrics } = useLyrics();
  const { currentLyric, setCurrentLyric } = useCurrentLyric();
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
    data,
    isLoading,
    refetch: getTrackInfo,
    error,
  } = useAxios({
    queryKey: "searchResult",
    fetchFunc: async () =>
      axios.request(
        ApiRequest({
          url: "https://spotify23.p.rapidapi.com/tracks/",
          params: {
            ids: trackId ?? track?.id,
          },
        })
      ),
  });
  const {
    data: lyricsData,
    isLoading: lyricsIsLoading,
    refetch: getAllLyrics,
  } = useAxios({
    queryKey: "lyrics",
    fetchFunc: () => getLyrics(trackId ?? track?.id),
  });
  useEffect(() => {
    getAllLyrics();
    if (error) {
      setLyrics([]);
    }
    if (lyricsData?.data?.lyrics?.lines) {
      setLyrics(lyricsData?.data?.lyrics?.lines);
      console.log(lyricsData?.data?.lyrics?.lines);
    }

    console.log(dataLyric);
  }, [trackId, getAllLyrics, lyricsData?.data?.lyrics?.lines]);
  useEffect(() => {
    const lyric = dataLyric?.findIndex((lyric: ILyrics) => {
      return (
        currentLyric.startTimeMs >= lyric.startTimeMs &&
        currentLyric.words <= lyric.words
      );
    });
    setActiveIndex(lyric ?? -1);
  }, [currentLyric]);
  useEffect(() => {
    getTrackInfo();
    if (data?.data.tracks[0]) {
      const track: ITrackInfo = {
        id: data?.data.tracks[0].id,
        title_with_featured: data?.data.tracks[0].name,
        song_art_image_thumbnail_url: data?.data.tracks[0].album.images[0].url,
        date: data?.data.tracks[0].album.release_date,
        preview_url: data?.data.tracks[0].preview_url,
        playing: false,
        name: data?.data.tracks[0].artists[0].name,
      };
      setTrackInfo(track);
    }
  }, [trackId, getTrackInfo, data?.data.tracks[0].id]);
  useEffect(() => {
    if (dataLyric) {
      let timeoutIds: number[] = [];
      for (let index = activeIndex + 1; index < dataLyric.length; index++) {
        const timeoutId = setTimeout(() => {
          setActiveIndex(index);
          setCurrentTime(Number(dataLyric[index].startTimeMs));
          const nextSibling = ref.current?.querySelectorAll("p")[index + 1];
          const current = ref.current?.querySelectorAll("p")[index];
          if (nextSibling) {
            current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          }

          if (index === dataLyric.length - 1 && playing) {
            setActiveIndex(-1);
            setCurrentTime(0);
          }
        }, Number(dataLyric[index].startTimeMs) - currentTime);

        timeoutIds.push(timeoutId);

        if (!playing) {
          timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
          break;
        }
      }

      return () => {
        timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      };
    }
  }, [dataLyric, playing, trackId]);
  return (
    <div className="max-w-[80%] m-auto py-10 ">
      <div className=" space-y-3 " ref={ref}>
        {lyricsIsLoading ? (
          <Loader />
        ) : dataLyric.length !== 0 ? (
          dataLyric?.map((item, index) => (
            <p
              key={index}
              className={`${
                index < activeIndex
                  ? "text-white/60"
                  : index === activeIndex
                  ? "text-white/90"
                  : "text-black opacity-80"
              } text-[1.5rem]/[1.5rem] xl:text-[2rem]/[2rem] font-bold tracking-wide cursor-pointer hover:text-white transition-all `}
              onClick={() => {
                setActiveIndex(index);
                setCurrentTime(Number(item.startTimeMs));
                setCurrentLyric(item);
              }}
            >
              {item.words}
            </p>
          ))
        ) : (
          <p className="text-center text-white text-[1.5rem]/[1.5rem] xl:text-[2rem]/[2rem] font-bold tracking-wide">
            This Track Has no Lyric
          </p>
        )}
      </div>
    </div>
  );
};
