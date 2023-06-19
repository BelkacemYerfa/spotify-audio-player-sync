import { useEffect, useRef, useState } from "react";
import { ILyrics } from "../../../@types/track";

interface LyricsProps {
  playing: boolean;
  dataLyric: ILyrics[];
}

export const Lyrics = ({ playing, dataLyric }: LyricsProps) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dataLyric) {
      let timeoutIds: number[] = [];

      for (let index = activeIndex + 1; index < dataLyric.length; index++) {
        const timeoutId = setTimeout(() => {
          setActiveIndex(index);
          setCurrentTime(dataLyric[index].startMs);
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
        }, dataLyric[index].startMs - currentTime);

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
  }, [playing]);
  return (
    <div className="max-w-[80%] m-auto py-10 ">
      <div className="  " ref={ref}>
        {dataLyric?.map((item, index) => (
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
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
};
