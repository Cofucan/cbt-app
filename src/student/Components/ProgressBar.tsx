import { FC } from "react";

export interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { value, max } = props;
  const progressPercentage = (value / max) * 100;

  return (
    <div className="h-8 w-full rounded-full bg-gray-200">
      <div
        className="flex h-8 items-center justify-center rounded-full bg-[#FF6636] transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      >
        <span className="font-medium text-white">
          {value} Out {max}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
