import React from 'react';
import Card from '../Card/Card';
import ProgressBar from '../ProgressBar/ProgressBar';

const IndividualDashboard: React.FC = () => {
  return (
    <div className="p-5 space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Your Results</h1>
        <h2 className="text-xl font-bold">Quantitatively Managed</h2>
        <p className="text-gray-600">
          Teams rely on metrics and advanced tools for decision-making, automating testing, and fostering continuous delivery practices...
        </p>
        <ProgressBar level={4} maxLevel={5} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card title="Invited Participants" value={1} />
        <Card title="Contributors" value={1} />
        <Card title="Emerging Themes" value={24} />
        <Card title="Recommendations" value={4} />
      </div>
    </div>
  );
};

export default IndividualDashboard;
