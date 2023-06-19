import { Link } from "react-router-dom";

interface GenreCardProps {
  background: string;
  title: string;
  src: string;
}

export const GenreCard = ({ background, title, src }: GenreCardProps) => {
  return (
    <Link
      to={"/genre/1"}
      className={`relative rounded-[10px] px-5 py-[21px] h-56 w-56 overflow-hidden duration-300 ease-linear `}
      style={{
        backgroundColor: background,
      }}
    >
      <h2 className="text-3xl/[38px] font-bold text-white -tracking-[0.03em] ">
        {title}
      </h2>
      <img
        className="absolute -right-5 -bottom-1 w-32 h-32 rotate-[25deg] "
        height={128}
        width={128}
        src={src}
        alt={title}
      />
    </Link>
  );
};
