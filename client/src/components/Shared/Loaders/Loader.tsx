import { Radio } from "react-loader-spinner";

interface LoaderProps {
  height?: number;
  width?: number;
}

export const Loader = ({ height = 60, width = 60 }: LoaderProps) => {
  return (
    <div className="bg-transparent h-full w-full flex items-center justify-center ">
      <Radio height={height} width={width} />
    </div>
  );
};
