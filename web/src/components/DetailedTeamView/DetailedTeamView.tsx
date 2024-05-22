import { Teammate, detailedTeam } from '@/types/interfaces/types';

import Card from '../Card/Card';
import ProgressBar from '../ProgressBar/ProgressBar';
import TeammateList from '../TeammateList/TeammateList';
import { useEffect, useState } from 'react';
import { fetchTeamDetails } from '../Firebase/detailedTeamData';

export default function DetailedTeamView() {
  const [team, setTeam] = useState<detailedTeam | null>(null);

  useEffect(() => {
    fetchTeamDetails('teamID1')
      .then((team) => {
        setTeam(team);
      })
      .catch((error) => {
        console.error('Error fetching teammates:', error);
      });
  }, []);

  return (
    <div>
      {team === null && <div>Loading...</div>}
      {team && (
      <><div className="p-5 space-y-4">
          <div>
            <h1 className="text-lg font-semibold">Your Results</h1>
            <h2 className="text-xl font-bold">Quantitatively Managed</h2>
            <p className="text-gray-600">
              Teams rely on metrics and advanced tools for decision-making, automating
              testing, and fostering continuous delivery practices...
            </p>
            <ProgressBar level={team.maturity} maxLevel={5} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card title="Invited Participants" value={team.invitedParticipants.length} />
            <Card title="Contributors" value={team.contributors.length} />
            <Card title="Emerging Themes" value={team.emergingThemes.length} />
            <Card title="Recommendations" value={team.recommendations.length} />
          </div>
        </div><div className="max-w-full overflow-x-auto p-4">
            <TeammateList teammates={team.userStats} />
          </div></>) }
    </div>
  );
}
