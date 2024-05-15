import React from 'react';

interface ProgressBarProps {
  level: number;
  maxLevel: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ level, maxLevel }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(level / maxLevel) * 100}%` }}></div>
    </div>
  );
};

export default ProgressBar;
