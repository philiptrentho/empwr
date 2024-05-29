import React from 'react';

import { Team } from '../../types/interfaces/types';
import { useNavigate } from 'react-router-dom';
import TeamEntry from './TeamEntry';

interface TeamListProps {
  teams: Team[];
  typeData : string;
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
function formatLastUpdate(hours: number): string {
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (days === 0 && remainingHours === 0) {
    return 'Updated less than an hour ago';
  } else if (days === 0) {
    return `Updated ${remainingHours} hour${remainingHours === 1 ? '' : 's'} ago`;
  } else if (remainingHours === 0) {
    return `Updated ${days} day${days === 1 ? '' : 's'} ago`;
  } else {
    return `Updated ${days} day${days === 1 ? '' : 's'} and ${remainingHours} hour${remainingHours === 1 ? '' : 's'} ago`;
  }
}

const TeamList: React.FC<TeamListProps> = ({ teams, typeData, userID, refreshTeams}) => {
  const navigate = useNavigate();
  return (
    <div style={{ maxHeight: '70vh' }}>
      <div className="flex flex-wrap w-4/5">
        <div className="flex items-center mr-4 w-1/4">
          <p className="font-bold">Name</p>
        </div>
        <div className="flex items-center mr-4 w-1/4">
          <p className="font-bold mr-2">Permissions</p>
        </div>
        <div className="flex items-center mr-4 w-1/4">
          <p className="font-bold mr-2">Followers</p>
        </div>
        <div className="flex items-center mr-4 w-1/6">
          <p className="font-bold mr-2">Last Updated</p>
        </div>
      </div>
      <div className="max-h-full overflow-y-auto border border-gray-300 bg-gray-100 p-4 rounded scrollbar-hide mr-4 hide-scrollbar">
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <TeamEntry index={index} key={team.teamID} team={team} typeData={typeData} userID={userID} refreshTeams={refreshTeams} />
            
          ))
        ) : (
          <p>No meetings found</p>
        )}
      </div>
    </div>
  );
};

export default TeamList;
