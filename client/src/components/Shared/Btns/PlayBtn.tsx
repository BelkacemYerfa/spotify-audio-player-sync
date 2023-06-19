import { useState } from "react";
import { Audio } from "react-loader-spinner";

export const PlayBtn = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div
      className={`absolute right-[12%] cursor-pointer ${
        isPlaying ? "" : "bottom-1/4"
      } z-10 h-[62px] w-[62px] 2xl:h-12 2xl:w-12 rounded-full flex items-center justify-center bg-primary_color_logo shadow-2xl shadow-black duration-300 ease-in-out ${
        isPlaying
          ? "opacity-100 bottom-1/3"
          : "opacity-0 group-hover:bottom-1/3 group-hover:opacity-100"
      }`}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {isPlaying ? (
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="black"
            d="M1 0h3.5s1 0 1 1v17.8s0 1 -1 1h-3.5s-1 0 -1 -1v-17.8s0 -1 1 -1"
          />
          <path
            fill="black"
            d="M10.9004 0h3.5s1 0 1 1v17.8s0 1 -1 1h-3.5s-1 0 -1 -1v-17.8s0 -1 1 -1"
          />
        </svg>
      ) : (
        <svg
          className="ml-[6px]"
          width="19"
          height="21"
          viewBox="0 0 19 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.4412 11.4412C19.1863 11.0229 19.1863 9.97713 18.4412 9.55884L1.67647 0.14722C0.931374 -0.271075 0 0.251793 0 1.08838V19.9116C0 20.7482 0.931372 21.2711 1.67647 20.8528L18.4412 11.4412Z"
            fill="black"
          />
        </svg>
      )}
    </div>
  );
};

interface PlayMusicBtnProps {
  isPlaying: boolean;
}

export const PlayMusicBtn = ({ isPlaying }: PlayMusicBtnProps) => {
  return isPlaying ? (
    <Audio height={28} width={28} color="#57B660" />
  ) : (
    <div className="opacity-0 duration-200 ease-linear group-hover:opacity-100 ">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_107_448)">
          <path
            d="M19.6176 14.6274C20.1275 14.3486 20.1275 13.6514 19.6176 13.3726L8.14706 7.09815C7.63726 6.81928 7 7.16786 7 7.72559V20.2744C7 20.8321 7.63726 21.1807 8.14706 20.9019L19.6176 14.6274Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_107_448">
            <rect width="28" height="28" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
