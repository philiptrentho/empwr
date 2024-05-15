import React from 'react';
import Card from '../Card/Card';
import ProgressBar from '../ProgressBar/ProgressBar';

const IndividualDashboard: React.FC = () => {
  return (
    <div className="p-5 grid grid-cols-2 gap-4">
      {/* "Your Results" card, taking full height */}
      <div className="col-span-1 bg-white shadow rounded-lg p-4 flex flex-col space-y-4">
        <h1 className="text-lg font-semibold">Your Results</h1>
        <h2 className="text-xl font-bold">Quantitatively Managed</h2>
        <p className="text-sm text-gray-600">
          Teams rely on metrics and advanced tools for decision-making, automating testing, and fostering continuous delivery practices...
        </p>
        <ProgressBar level={4} maxLevel={5} />
      </div>

      {/* Grid for the other cards */}
      <div className="col-span-1 grid grid-cols-2 gap-4">
        <Card title="Invited Participants" value={1} />
        <Card title="Contributors" value={1} />
        <Card title="Emerging Themes" value={24} />
        <Card title="Recommendations" value={4} />
      </div>
    </div>
  );
};

export default IndividualDashboard;
