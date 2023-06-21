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
  return (
    <Link
      to={`/${id}`}
      className="flex justify-between items-center w-full py-[10px] pl-2 pr-4 duration-300 ease-linear cursor-pointer hover:bg-ui-gray-color-three group rounded-md"
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
        {releaseDate}
      </p>
    </Link>
  );
};
