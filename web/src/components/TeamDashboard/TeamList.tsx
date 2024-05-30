import React from 'react';
import { useNavigate } from 'react-router-dom';
import TeamEntry from './TeamEntry';
import { Team } from '../../types/interfaces/types';






interface TeamListProps {
  teams: Team[];
  typeData: string;
  userID: string;
  refreshTeams: () => Promise<void>;
}
const formatLastUpdated = (timeString: string): string => {
  const lastUpdatedDate = new Date(timeString);
  if (isNaN(lastUpdatedDate.getTime())) {
    throw new Error(`Invalid date format for LastUpdated: ${timeString}`);
  }


  const formattedLastUpdated = lastUpdatedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });


  return formattedLastUpdated;
};


const TeamList: React.FC<TeamListProps> = ({ teams, typeData, userID, refreshTeams }) => {
  const navigate = useNavigate();

  return (
    <div style={{ maxHeight: '70vh' }} className="overflow-hidden">
      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <div className="w-1/4 p-2 font-bold">Name</div>
          <div className="w-1/4 p-2 font-bold">Permissions</div>
          <div className="w-1/4 p-2 font-bold">Followers</div>
          <div className="w-1/4 p-2 font-bold">Last Updated</div>
        </div>
        <div className="flex flex-col w-full overflow-y-auto border border-gray-300 bg-gray-100 p-4 rounded scrollbar-hide">
          {teams.length > 0 ? teams.map((team, index) => (
            <div className="flex w-full" key={team.teamID}>
              <div className="w-1/4 p-2">{team.name}</div>
              <div className="w-1/4 p-2">{team.Permissions}</div>
              <div className="w-1/4 p-2">{team.followers}</div>
              <div className="w-1/4 p-2">{formatLastUpdated(team.LastUpdated)}</div>
            </div>
          )) : (
            <p>No meetings found</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default TeamList;
