import { Teammate } from '@/types/interfaces/types';

import Card from '../Card/Card';
import ProgressBar from '../ProgressBar/ProgressBar';
import TeammateList from '../TeammateList/TeammateList';
import { useEffect, useState } from 'react';
import { fetchTeamMates } from '../Firebase/individualData';

export default function IndividualDashboard() {
  const [teammates, setTeammates] = useState<Teammate[]>([]);

  useEffect(() => {
    fetchTeamMates('teamID1').then((teammates) => {
      setTeammates(teammates);
      console.log('Teammates:', teammates);
    });
  }, []);

  return (
    <div>
      <div className="p-5 space-y-4">
        <div>
          <h1 className="text-lg font-semibold">Your Results</h1>
          <h2 className="text-xl font-bold">Quantitatively Managed</h2>
          <p className="text-gray-600">
            Teams rely on metrics and advanced tools for decision-making, automating
            testing, and fostering continuous delivery practices...
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
      <div className="max-w-full overflow-x-auto p-4">
        <TeammateList teammates={teammates} />
      </div>
    </div>
  );
}
