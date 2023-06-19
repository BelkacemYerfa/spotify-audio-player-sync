import { motion } from "framer-motion";

interface IconProps {
  className?: string;
  width: number;
  height: number;
  path: string;
  opacity?: number;
  fill: string;
  togglePlayPause?: () => void;
  isPlaying?: boolean;
}

export const Icon = ({
  path,
  className = "",
  width,
  height,
  opacity = 1,
  fill,
  togglePlayPause,
  isPlaying,
}: IconProps) => {
  return (
    <motion.div
      initial={false}
      whileHover={{
        scale: 1.1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.3,
      }}
      onClick={togglePlayPause}
    >
      {isPlaying ? (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM14.5 11.1262L29.5 19.1933C30.1667 19.5518 30.1667 20.4482 29.5 20.8067L14.5 28.8738C13.8333 29.2323 13 28.7842 13 28.0671V11.9329C13 11.2158 13.8333 10.7677 14.5 11.1262Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          className={className}
          height={height}
          width={width}
          viewBox={`0 0 ${height} ${width}`}
          fill="none"
        >
          <path
            className={`duration-300 ease-in-out ${
              opacity !== 1 ? "hover:opacity-100" : ""
            }`}
            fillRule="evenodd"
            clipRule="evenodd"
            opacity={opacity}
            d={path}
            fill={fill}
          />
        </svg>
      )}
    </motion.div>
  );
};
