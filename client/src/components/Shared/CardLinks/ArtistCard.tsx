import { PlayBtn } from "../Btns/PlayBtn";
import { Link } from "react-router-dom";

export const ArtistCard = () => {
  const artist = {
    img: "https://images.squarespace-cdn.com/content/v1/57da1afa37c581678eed7e1f/1513052859117-SA196GUNDURT90Q8MUK0/original.png",
    username: "Ed Sheeran",
  };
  return (
    <div className="relative duration-300 ease-linear group">
      <PlayBtn />
      <Link
        to={"/artist/1"}
        className="flex flex-col gap-y-[25px] w-fit px-[21px] py-5 bg-ui-gray-color-one hover:bg-ui-gray-color-three rounded-lg cursor-pointer duration-300 ease-linear group"
      >
        <div className="relative">
          <img
            className="rounded-full h-[184px] w-[184px] object-cover shadow-2xl duration-200 ease-linear group-hover:shadow-black"
            height={184}
            width={184}
            src={artist.img}
            alt={`@${artist.username}`}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-xl/[25px] text-white font-bold tracking-[0.03em]">
            {artist.username}
          </h3>
          <p className="text-lg/[23px] text-sub_title_color font-[450]">
            Artist
          </p>
        </div>
      </Link>
    </div>
  );
};
