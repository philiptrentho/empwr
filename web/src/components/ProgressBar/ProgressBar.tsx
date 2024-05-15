import React from 'react';

interface ProgressBarProps {
  level: number;
  maxLevel: number; // Assuming maxLevel is always 5 for a discrete 5-part progress bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({ level, maxLevel }) => {
  const filledClassName = "bg-green-600 h-2.5 rounded-full";
  const emptyClassName = "bg-gray-200 h-2.5 rounded-full";

  return (
    <div className="flex justify-between gap-1">
      {Array.from({ length: maxLevel }, (_, index) => (
        <div
          key={index}
          className={index < level ? filledClassName : emptyClassName}
          style={{ width: "20%" }}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
