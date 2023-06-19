import { useCallback, useEffect } from "react";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";

export const Audio = () => {
  const { togglePlayPause, ready, loading, playing, volume } = useAudioPlayer({
    src: "https://redirector.googlevideo.com/videoplayback?expire=1686931580&ei=GzSMZPqTOemY0_wPiJ2EyA8&ip=198.98.59.215&id=o-APGtY_A2Ncml8ZqDdS1wcPlZf06n7_CzKmr4HKs3Od-O&itag=140&source=youtube&requiressl=yes&mh=dX&mm=31%2C29&mn=sn-ab5sznzl%2Csn-ab5l6nrz&ms=au%2Crdu&mv=m&mvi=5&pl=24&initcwndbps=75000&siu=1&spc=qEK7ByMN_qRygurvuMpGf_pdGcZheYp98NvTpiw1vzsq1J3xwK-jvF4&vprv=1&svpuc=1&mime=audio%2Fmp4&ns=9vWszoZO3BcOg3gRfl9yNXcN&gir=yes&clen=4795394&dur=296.263&lmt=1674367599011235&mt=1686909678&fvip=1&keepalive=yes&fexp=24007246%2C24362688%2C24363393%2C51000011%2C51000029&c=WEB&txp=4532434&n=RpD_8Ovh2UtQ_Q&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Csiu%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAMee0-pRngLxxaxlDwGOvCKyvaJZG6bPbHuQEwZySpWBAiEA7TCnCitfWgpB1oAzDZn20EvIsnG9_0Wb8QqPWXg1MVQ%3D&sig=AOq0QJ8wRgIhAKFKirdQNBCpWBDauKjQV55TLlMAYOtMcYr9GEBBmqVDAiEA-DFwgcUaFQdJXleAfXxbYUJhPl_cVq0VPMxuI8Tf3aA%3D&range=0-",
    format: "mp4",
    autoplay: false,
    onend: () => console.log("sound has ended!"),
  });
  const { percentComplete, duration, seek, position } = useAudioPosition({
    highRefreshRate: true,
  });
  const goToPosition = useCallback(
    (percentage: number) => {
      seek(duration * percentage);
      console.log(seek(percentage * duration));
    },
    [duration, seek]
  );

  if (!ready && !loading) return <div>No audio to play</div>;
  if (loading) return <div>Loading audio</div>;

  const transferTimeToMin = (duration: number) => {
    duration = Math.floor(duration);
    const getMin = duration / (60 * 100);
    const fraction = getMin - Math.floor(getMin);
    const sec = (fraction * 60) / 100;
    return (Math.floor(getMin) + sec).toFixed(2).replace(".", ":");
  };
  return (
    <>
      <div
        onKeyDown={(e) => {
          if (e.key === "space") {
            togglePlayPause();
          }
        }}
        className="flex items-start w-4/5 px-2 py-2  gap-x-2"
      >
        <button onClick={togglePlayPause} className="w-20">
          {playing ? "Pause" : "Play"}
        </button>
        {duration && (
          <div className="relative w-full">
            <div className="relative w-full group ">
              <input
                type="range"
                className="hidden group-hover:block group-hover:z-20 absolute w-full h-2 rounded-full bg-transparent  appearance-none focus:outline-none "
                min={0}
                max={100}
                step={"any"}
                value={percentComplete - 0.25}
                onChange={(e) => {
                  goToPosition(Number(e.target.value) / 100);
                }}
              />
              <div
                className="absolute z-10 group-hover:z-1 top-0 left-0 h-2 bg-white rounded-lg"
                style={{ width: percentComplete.toString() + "%" }}
              ></div>
              <div className="absolute top-0 left-0 group-hover:z-0 h-2 bg-gray-700 rounded-lg w-full"></div>
            </div>
          </div>
        )}

        <p className="w-10">
          {transferTimeToMin((100 - percentComplete) * duration)}
        </p>
      </div>
      <input
        type="range"
        step={0.01}
        min={0}
        max={1}
        onChange={(e) => {
          const target = Number(e.target.value);
          volume(target);
        }}
      />
    </>
  );
};
