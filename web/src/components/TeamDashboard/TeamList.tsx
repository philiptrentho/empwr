import React from 'react';
import { Team } from '../../types/interfaces/types';

interface TeamListProps {
  teams: Team[];
}
function formatLastUpdate(hours: number): string {
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days === 0 && remainingHours === 0) {
    return "Updated less than an hour ago";
  } else if (days === 0) {
    return `Updated ${remainingHours} hour${remainingHours === 1 ? '' : 's'} ago`;
  } else if (remainingHours === 0) {
    return `Updated ${days} day${days === 1 ? '' : 's'} ago`;
  } else {
    return `Updated ${days} day${days === 1 ? '' : 's'} and ${remainingHours} hour${remainingHours === 1 ? '' : 's'} ago`;
  }
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {

  return (
    <div>
      <div className="flex flex-wrap w-4/5">
        <div className="flex items-center mr-4 w-1/4">
          <p className="font-bold">Name</p>
        </div>
        <div className="flex items-center mr-4 w-1/4">
          <p className="font-bold mr-2">Permissions</p>
        </div>
        <div className="flex items-center mr-4 w-1/5">
          <p className="font-bold mr-2">Followers</p>
        </div>
        <div className="flex items-center mr-4 w-1/5">
          <p className="font-bold mr-2">Last Updated</p>
        </div>
      </div>
      <div className="w-4/5 max-h-96 overflow-y-auto border border-gray-300 bg-gray-100 p-4 rounded w-full scrollbar-hide mr-4 hide-scrollbar">
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <div key={index} className="flex flex-row space-x-4 bg-white rounded p-4 mb-4">
              <h2 className="font-bold text-lg mb-2 w-1/5">{team.name}</h2>
              <p className="w-1/5">{team.Permissions}</p>
              <p className="w-1/5">{team.followers.length}</p>
              <p className="w-1/5">{formatLastUpdate(team.LastUpdated)}</p>
              <div className="w-24">
              <button
                className={`h-12 py-2 px-4 rounded-full w-full text-center ${team.follow ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}`}
                onClick={() => { /* nothing here for now; we'll change it to adjust the followers array later */ }}
              >
                {team.follow ? 'Unfollow' : 'Follow'}
              </button>
              </div>



            </div>
          ))) : (
          <p>No meetings found</p>
        )}
      </div>
    </div>
  );
};

export default TeamList;
