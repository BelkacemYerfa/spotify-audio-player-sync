import { ColorRing } from "react-loader-spinner";
import { Icon } from "../Icons/Icon";
import { ProgressBar } from "./ProgressBar";
import { useCallback, useEffect, useState } from "react";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import { useTrackInfo } from "../../../hooks/useTrackInfo";

interface AudioPlayerProps {
  setPlaying: (playing: boolean) => void;
}

export const AudioPlayer = ({ setPlaying }: AudioPlayerProps) => {
  const { track } = useTrackInfo();
  const { togglePlayPause, loading, playing, volume } = useAudioPlayer({
    src: track?.preview_url,
    format: "mp3",
    autoplay: false,
    onend: () => {
      console.log("hi");
    },
  });
  const { percentComplete, duration, seek } = useAudioPosition();
  const goToPosition = useCallback(
    (percentage: number) => {
      seek(duration * percentage);
      console.log(seek(percentage * duration));
    },
    [duration, seek]
  );
  const transferTimeToMin = (duration: number) => {
    duration = Math.floor(duration);
    const getMin = duration / (60 * 100);
    const fraction = getMin - Math.floor(getMin);
    const sec = (fraction * 60) / 100;
    return (Math.floor(getMin) + sec).toFixed(2).replace(".", ":");
  };
  useEffect(() => {
    setPlaying(playing);
  }, [track?.preview_url, playing]);
  return (
    <div className="flex h-fit items-center justify-between w-full py-2 px-[18px] bg-audio_player_bg">
      <div className="w-1/3 items-center gap-x-[21px] hidden md:flex  ">
        {track?.song_art_image_thumbnail_url && (
          <img
            src={track?.song_art_image_thumbnail_url}
            height={64}
            width={64}
            className="h-[4rem] w-[4rem] "
            alt="title"
          />
        )}
        <div className="flex items-center gap-x-8">
          <div className="flex flex-col ">
            <h3 className=" text-base sm:text-lg/[23px] text-white font-[450]">
              {track?.title_with_featured}
            </h3>
            <p className=" text-sm sm:text-base/[20px] text-sub_title_color">
              {track?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center gap-y-3">
        <div className="relative flex items-center w-full ">
          <div className="block md:hidden absolute my-auto ">
            <Icon
              height={21}
              width={22}
              path="M11.0009 2.03963C13.4673 -0.25648 17.2787 -0.18027 19.6548 2.28786C22.0299 4.75708 22.1118 8.68955 19.9026 11.2546L10.9988 20.5L2.09703 11.2546C-0.112132 8.68955 -0.0291836 4.75055 2.34482 2.28786C4.72303 -0.177004 8.52711 -0.259747 11.0009 2.03963Z"
              fill="#63CF6C"
            />
          </div>
          <div className=" w-full flex items-center justify-center gap-x-[22px]">
            <Icon
              height={19}
              width={22}
              path="M16.4708 0.31952C16.0448 0.745547 16.0448 1.43627 16.4708 1.8623L17.1566 2.54813H14.8151C13.3733 2.54813 12.0016 3.21499 11.0522 4.37757L2.94266 14.3076C2.37299 15.0052 1.55001 15.4053 0.684927 15.4053H0V17.5481H0.684927C2.12674 17.5481 3.49837 16.8813 4.44781 15.7187L12.5573 5.78865C13.127 5.0911 13.95 4.69099 14.8151 4.69099H17.4991L16.4708 5.71924C16.0448 6.14527 16.0448 6.836 16.4708 7.26202C16.8968 7.68805 17.5876 7.68805 18.0136 7.26202L21.1313 4.14432C21.3265 3.94906 21.3265 3.63248 21.1313 3.43722L18.0136 0.31952C17.5876 -0.106507 16.8968 -0.106507 16.4708 0.31952ZM1.36879 1.54813C2.76049 1.54813 4.08446 2.19407 5.0009 3.32018L7.45312 6.17275L6 7.54813L3.54806 4.687C2.9982 4.01133 2.20381 3.62377 1.36879 3.62377H0.000425339V1.54813H1.36879ZM11.3284 13.7761C12.2449 14.9022 13.5688 15.5481 14.9605 15.5481H17.6419L16.4708 16.7192C16.0448 17.1453 16.0448 17.836 16.4708 18.262C16.8968 18.688 17.5876 18.688 18.0136 18.262L21.1313 15.1443C21.3265 14.9491 21.3265 14.6325 21.1313 14.4372L18.0136 11.3195C17.5876 10.8935 16.8968 10.8935 16.4708 11.3195C16.0448 11.7455 16.0448 12.4363 16.4708 12.8623L17.081 13.4725H14.9605C14.1255 13.4725 13.3311 13.0849 12.7813 12.4093L11 10.0481L9.5 11.5481L11.3284 13.7761Z"
              fill="#BABABA"
            />
            <Icon
              width={18}
              height={18}
              opacity={0.8}
              path="M1 0C0.447715 0 0 0.447716 0 1V17C0 17.5523 0.447715 18 1 18H3C3.55228 18 4 17.5523 4 17V11.1512L16.5 17.8738C17.1667 18.2323 18 17.7842 18 17.0671V0.932899C18 0.215823 17.1667 -0.232349 16.5 0.126189L4 6.84877V1C4 0.447716 3.55228 0 3 0H1Z"
              fill="white"
            />
            <div className="relative">
              <ColorRing
                height={40}
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                visible={loading}
                wrapperClass="w-10 h-10 rounded-full bg-gray-700/80 absolute left-0 top-0"
              />
              <Icon
                height={40}
                width={40}
                togglePlayPause={togglePlayPause}
                isPlaying={!playing}
                fill="white"
                path="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM13 12C13 11.4477 13.4477 11 14 11H17C17.5523 11 18 11.4477 18 12V28C18 28.5523 17.5523 29 17 29H14C13.4477 29 13 28.5523 13 28V12ZM23 11C22.4477 11 22 11.4477 22 12V28C22 28.5523 22.4477 29 23 29H26C26.5523 29 27 28.5523 27 28V12C27 11.4477 26.5523 11 26 11H23Z"
              />
            </div>
            <Icon
              width={18}
              height={18}
              opacity={0.8}
              path="M17 0C17.5523 0 18 0.447716 18 1V17C18 17.5523 17.5523 18 17 18H15C14.4477 18 14 17.5523 14 17V11.1512L1.5 17.8738C0.833332 18.2323 -1.90735e-06 17.7842 -1.90735e-06 17.0671V0.932899C-1.90735e-06 0.215823 0.833332 -0.232349 1.5 0.126189L14 6.84877V1C14 0.447716 14.4477 0 15 0H17Z"
              fill="white"
            />
            <Icon
              width={20}
              height={20}
              path="M16 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H6V16H4C1.79086 16 0 14.2091 0 12V4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V12C20 14.2091 18.2091 16 16 16H12.843L14.0141 17.1711C14.4401 17.5971 14.4401 18.2879 14.0141 18.7139C13.588 19.1399 12.8973 19.1399 12.4713 18.7139L9.35359 15.5962C9.15833 15.4009 9.15833 15.0843 9.35359 14.8891L12.4713 11.7714C12.8973 11.3454 13.588 11.3454 14.0141 11.7714C14.4401 12.1974 14.4401 12.8881 14.0141 13.3142L13.3282 14H16C17.1046 14 18 13.1046 18 12V4C18 2.89543 17.1046 2 16 2Z"
              fill="#BABABA"
            />
          </div>
          <div className="block md:hidden absolute right-0 ">
            <Icon
              width={22}
              height={19}
              path="M3.2 2C2.53726 2 2 2.53892 2 3.2037V9.83984C2 10.5 2.5 11 3.2 11H6V13H3C0.746679 13 0 11.1677 0 8.90741V3.61111C0 1.61675 1.21177 0 3.2 0H6V2H3.2ZM19 2H11C10.4477 2 10 2.44772 10 3V16C10 16.5523 10.4477 17 11 17H19C19.5523 17 20 16.5523 20 16V3C20 2.44772 19.5523 2 19 2ZM11 0C9.34315 0 8 1.34315 8 3V16C8 17.6569 9.34315 19 11 19H19C20.6569 19 22 17.6569 22 16V3C22 1.34315 20.6569 0 19 0H11ZM15 15C16.6569 15 18 13.6569 18 12C18 10.3431 16.6569 9 15 9C13.3431 9 12 10.3431 12 12C12 13.6569 13.3431 15 15 15ZM16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6ZM6 16H3V18H6V16Z"
              fill="white"
              opacity={0.7}
            />
          </div>
        </div>
        <div className="w-full flex items-center gap-x-4 ">
          <p className="text-xs/[17px] text-ui-gray-color-seven font-normal ">
            {transferTimeToMin(percentComplete * duration)}
          </p>
          <ProgressBar
            width="w-full"
            value={percentComplete - 0.25}
            onChange={goToPosition}
            min={0}
            max={100}
          />
          <p className=" text-xs/[17px] text-ui-gray-color-seven font-normal ">
            {transferTimeToMin((100 - percentComplete) * duration)}
          </p>
        </div>
      </div>
      <div className="w-1/3 hidden md:flex justify-end gap-x-[18px]">
        <Icon
          width={18}
          height={18}
          path="M15 2H3C2.44772 2 2 2.44772 2 3V4C2 4.55228 2.44772 5 3 5H15C15.5523 5 16 4.55228 16 4V3C16 2.44772 15.5523 2 15 2ZM3 0C1.34315 0 0 1.34315 0 3V4C0 5.65685 1.34315 7 3 7H15C16.6569 7 18 5.65685 18 4V3C18 1.34315 16.6569 0 15 0H3ZM0 10H18V12.5H0V10ZM18 16H0V18.5H18V16Z"
          fill="white"
          opacity={0.7}
        />
        <Icon
          width={22}
          height={19}
          path="M3.2 2C2.53726 2 2 2.53892 2 3.2037V9.83984C2 10.5 2.5 11 3.2 11H6V13H3C0.746679 13 0 11.1677 0 8.90741V3.61111C0 1.61675 1.21177 0 3.2 0H6V2H3.2ZM19 2H11C10.4477 2 10 2.44772 10 3V16C10 16.5523 10.4477 17 11 17H19C19.5523 17 20 16.5523 20 16V3C20 2.44772 19.5523 2 19 2ZM11 0C9.34315 0 8 1.34315 8 3V16C8 17.6569 9.34315 19 11 19H19C20.6569 19 22 17.6569 22 16V3C22 1.34315 20.6569 0 19 0H11ZM15 15C16.6569 15 18 13.6569 18 12C18 10.3431 16.6569 9 15 9C13.3431 9 12 10.3431 12 12C12 13.6569 13.3431 15 15 15ZM16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6ZM6 16H3V18H6V16Z"
          fill="white"
          opacity={0.7}
        />

        <div className="flex gap-x-3 w-[35%]">
          <Icon
            width={21}
            height={19}
            opacity={0.7}
            className="cursor-pointer "
            path="M10.1385 2.74993L3.47894 6.6673C1.50702 7.82725 1.50702 10.679 3.47894 11.8389L10.1385 15.7563V2.74993ZM2.4649 4.94343C-0.821633 6.87669 -0.821633 11.6295 2.4649 13.5628L10.6314 18.3666C11.2981 18.7588 12.1385 18.2781 12.1385 17.5047V1.00152C12.1385 0.228102 11.2981 -0.252554 10.6314 0.139583L2.4649 4.94343ZM13.1387 2.25317C14.1236 2.25317 15.0989 2.44717 16.0088 2.82408C16.9187 3.20099 17.7455 3.75343 18.442 4.44987C19.1384 5.14631 19.6909 5.97311 20.0678 6.88305C20.4447 7.79299 20.6387 8.76826 20.6387 9.75317C20.6387 10.7381 20.4447 11.7134 20.0678 12.6233C19.6909 13.5332 19.1384 14.36 18.442 15.0565C17.7455 15.7529 16.9187 16.3054 16.0088 16.6823C15.0989 17.0592 14.1236 17.2532 13.1387 17.2532V15.2443C13.8598 15.2443 14.5738 15.1022 15.24 14.8263C15.9062 14.5503 16.5116 14.1459 17.0215 13.636C17.5314 13.1261 17.9358 12.5207 18.2118 11.8545C18.4877 11.1883 18.6298 10.4743 18.6298 9.75317C18.6298 9.03207 18.4877 8.31803 18.2118 7.65182C17.9358 6.98561 17.5314 6.38028 17.0215 5.87038C16.5116 5.36049 15.9062 4.95602 15.24 4.68006C14.5738 4.40411 13.8598 4.26208 13.1387 4.26208V2.25317ZM15.3311 7.53625C14.7997 6.89547 14.053 6.44314 13.213 6.25317L13.1387 13.2532C13.9826 13.079 14.7387 12.6408 15.2836 12.0101C15.8285 11.3795 16.1299 10.5936 16.1385 9.78101C16.1471 8.96839 15.8625 8.17704 15.3311 7.53625Z"
            fill="white"
          />
          <ProgressBar
            width="w-4/5"
            onChange={volume}
            value={volume()}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
};
