import React from 'react';

import { Team } from '../../types/interfaces/types';
import TeamEntry from './TeamEntry';

interface TeamListProps {
  teams: Team[];
  typeData: string;
  userID: string;
  refreshTeams: () => Promise<void>;
}

const TeamList: React.FC<TeamListProps> = ({ teams, typeData, userID, refreshTeams }) => {
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
            <TeamEntry
              index={index}
              key={team.teamID}
              team={team}
              typeData={typeData}
              userID={userID}
              refreshTeams={refreshTeams}
            />
          ))
        ) : (
          <p>No meetings found</p>
        )}
      </div>
    </div>
  );
};

export default TeamList;
