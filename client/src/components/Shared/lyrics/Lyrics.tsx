import { useEffect, useRef, useState } from "react";
import { useLyrics } from "../../../hooks/useTrackInfo";

interface LyricsProps {
  playing: boolean;
}

export const Lyrics = ({ playing }: LyricsProps) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);
  const { lyrics: dataLyric } = useLyrics();
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
      console.log(timeoutIds);
      return () => {
        timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      };
    }
  }, [playing]);
  return (
    <div className="max-w-[80%] m-auto py-10 ">
      <div className=" space-y-3 " ref={ref}>
        {dataLyric.length !== 0 ? (
          dataLyric?.map((item, index) => (
            <p
              key={index}
              className={`${
                index < activeIndex
                  ? "text-white/60"
                  : index === activeIndex
                  ? "text-white/90"
                  : "text-black opacity-80"
              } text-[1.5rem]/[1.5rem] xl:text-[2rem]/[2rem] font-bold tracking-wide`}
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
