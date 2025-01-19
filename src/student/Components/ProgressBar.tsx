import { FC } from "react";

export interface ProgressBarProps {
  value: number
  max: number
}

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { value, max } = props
  const progressPercentage = (value / max) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-8">
      <div
        className="bg-[#FF6636] h-8 rounded-full flex items-center justify-center transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      >
        <span className="text-white font-medium">
          {value} Out {max}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
