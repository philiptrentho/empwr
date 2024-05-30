import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { detailedTeam } from '@/types/interfaces/types';

import Card from '../Card/Card';
import { fetchTeamDetails } from '../Firebase/detailedTeamData';
import InfoCard from '../InfoCard/InfoCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import TeammateList from '../TeammateList/TeammateList';

export default function DetailedTeamView() {
  const { teamID } = useParams();
  const [team, setTeam] = useState<detailedTeam | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (teamID) {
      fetchTeamDetails(teamID)
        .then((team) => {
          setTeam(team);
        })
        .catch((error) => {
          console.error('Error fetching teammates:', error);
        });
    }
  }, []);

  return (
    <div>
      {/* Back button with a left arrow */}
      <button
        onClick={() => navigate('/TeamView')}
        className="p-2 text-lg font-semibold bg-gray-200 rounded hover:bg-gray-300"
      >
        ←
      </button>
      {team === null && <div>Loading...</div>}
      {team && (
        <>
          <div className="p-5 space-y-4">
            <div>
              <h1 className="text-2xl font-semibold">{team.name}</h1>
              <h2 className="text-lg font-bold">Quantitatively Managed</h2>
              <p className="text-gray-600">
                Teams rely on metrics and advanced tools for decision-making, automating
                testing, and fostering continuous delivery practices...
              </p>
              <ProgressBar level={team.maturity} maxLevel={5} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card
                title="Invited Participants"
                value={team.invitedParticipants.length}
              />
              <Card title="Contributors" value={team.contributors.length} />
              <Card title="Emerging Themes" value={team.emergingThemes.length} />
              <Card title="Recommendations" value={team.recommendations.length} />
            </div>
          </div>
          <div className="max-w-full overflow-x-auto p-4 flex flex-col md:flex-row md:flex-wrap space-x-6 space-y-6">
            <InfoCard />
            <TeammateList teammates={team.userStats} />
          </div>
        </>
      )}
    </div>
  );
}
