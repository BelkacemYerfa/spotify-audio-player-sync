import { useEffect, useState } from "react";
import { SearchBar } from "../components/Search/SearchBar";
import { MusicCard } from "../components/Shared/CardLinks/MusicCard";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from "../components/Shared/Audio/AudioPlayer";
import { Lyrics } from "./Lyrics";
import { useLoading, useTracks } from "../hooks/useTrackInfo";
import { Loader } from "../components/Shared/Loaders/Loader";

const Search = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const { tracks } = useTracks();
  const {
    isLoading: { loading },
  } = useLoading();
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  return (
    <div className="h-screen w-full space-y-10 flex flex-col ">
      <div className="w-full h-full z-10 flex flex-col bottom-0 ">
        <div className="flex w-full flex-1 overflow-y-auto max-h-3/5">
          <div className="relative flex flex-col w-full md:w-1/3 space-y-4 py-3 overflow-y-auto max-h-3/5">
            <div className="sticky w-full">
              <SearchBar />
            </div>
            {Loading ? (
              <Loader />
            ) : (
              <div className="space-y-2 overflow-y-auto LyricHolder flex items-center flex-col max-h-3/5 w-full ">
                {tracks.map((item) => (
                  <MusicCard
                    key={item.id}
                    releaseDate={item.date}
                    title={item.title_with_featured}
                    src={item.song_art_image_thumbnail_url}
                    author={item?.name}
                    id={item.id}
                    playing={item.playing}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="w-2/3 hidden md:block rounded-l-md  bg-home_decorative_color_one overflow-y-auto max-h-3/5 p-3 ">
            <Lyrics playing={playing} />
          </div>
        </div>
        <AudioPlayerProvider>
          <AudioPlayer setPlaying={(play: boolean) => setPlaying(play)} />
        </AudioPlayerProvider>
      </div>
    </div>
  );
};

export default Search;
