import { useState } from "react";
import { SearchBar } from "../components/Search/SearchBar";
import { MusicCard } from "../components/Shared/CardLinks/MusicCard";
import { ILyrics, ITrack } from "../@types/track";
import { AudioPlayerProvider } from "react-use-audio-player";
import { AudioPlayer } from "../components/Shared/Audio/AudioPlayer";
import { Radio } from "react-loader-spinner";
import { Lyrics } from "../components/Shared/lyrics/Lyrics";

const Search = () => {
  const [track, setTracks] = useState<ITrack[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playingTrack, setPlayingTrack] = useState<ITrack>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [preview_url, setPreviewUrl] = useState<string>("");
  const [lyrics, setLyrics] = useState<ILyrics[]>([]);
  return (
    <div className="h-screen w-full space-y-10 flex flex-col ">
      <div className="w-full h-full z-10 flex flex-col bottom-0 ">
        <div className="flex w-full flex-1 overflow-y-auto max-h-3/5">
          <div className="relative flex flex-col w-full md:w-1/3 space-y-4 py-3 overflow-y-auto max-h-3/5">
            <div className="sticky w-full">
              <SearchBar
                setTracks={(track: ITrack[]) => setTracks(track)}
                setIsLoading={(isLoading: boolean) => setIsLoading(isLoading)}
              />
            </div>
            {isLoading ? (
              <div className="flex-1 w-full flex items-center justify-center ">
                <Radio />
              </div>
            ) : (
              <div className="space-y-2 overflow-y-auto LyricHolder flex items-center flex-col max-h-3/5 w-full ">
                {track.map((item) => (
                  <MusicCard
                    tracks={track}
                    setCurrentTrackInfo={(currentTrack: ITrack) =>
                      setPlayingTrack(currentTrack)
                    }
                    setPreviewUrl={(preview_url: string) =>
                      setPreviewUrl(preview_url)
                    }
                    setLyrics={(lyrics: ILyrics[]) => setLyrics(lyrics)}
                    key={item.id}
                    releasedate={item.date}
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
            <Lyrics playing={playing} dataLyric={lyrics} />
          </div>
        </div>
        <AudioPlayerProvider>
          <AudioPlayer
            setPlaying={setPlaying}
            playingTrack={
              playingTrack ?? {
                id: 0,
                song_art_image_thumbnail_url: "",
                title_with_featured: "",
                date: "",
                name: "",
                playing: false,
              }
            }
            previewUrl={preview_url}
          />
        </AudioPlayerProvider>
      </div>
    </div>
  );
};

export default Search;
