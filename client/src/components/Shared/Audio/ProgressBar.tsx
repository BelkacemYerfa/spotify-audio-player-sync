interface ProgressBarProps {
  width: string;
  value: number;
  max: number;
  min: number;
  onChange: (percentage: number) => void;
  step?: number;
  className?: string;
}

export const ProgressBar = ({
  width,
  value,
  max,
  min,
  onChange,
  step,
}: ProgressBarProps) => {
  return (
    <div className={`relative ${width} group`}>
      <input
        type="range"
        className="hidden inset-y-0 m-auto group-hover:block group-hover:z-20 absolute w-full h-1 rounded-full bg-transparent  appearance-none focus:outline-none "
        min={min}
        max={max}
        step={step ? step : "any"}
        value={value ? value : ""}
        onChange={(e) => {
          onChange(
            step ? Number(e.target.value) : Number(e.target.value) / 100
          );
        }}
      />
      <div
        className="absolute z-10  inset-y-0 m-auto group-hover:z-1 top-0 left-0 h-1 bg-white rounded-lg"
        style={{
          width: step ? value * 100 + "%" : value + 0.25 + "%",
        }}
      ></div>
      <div className="absolute inset-0 m-auto top-0 left-0 group-hover:z-0 h-1 bg-ui-gray-color-five rounded-lg w-full"></div>
    </div>
  );
};
