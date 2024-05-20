import './TeamView.css';

import React, { useEffect, useState } from 'react';

import TeamList from '@/components/TeamDashboard/TeamList';
import TeamUpdate from '@/components/TeamDashboard/TeamUpdate';

import {
  fetchAllActions,
  fetchAllMeetings,
  fetchAllTeams,
  fetchMeetings,
  fetchUser,
} from '../components/Firebase/firebase';
import { Team } from '../types/interfaces/types';

export default function TeamView() {
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeamsData = await fetchAllTeams();
        setTeamsData(fetchedTeamsData);
      } catch (error) {
        console.error('Error handling:', error);
      }
    };

    fetchData();
  }, []);

  const filteredTeams = teamsData.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-row">
  <div className="flex-grow">
    <div className="p-5 space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Your Results</h1>
        <h2 className="text-xl font-bold">Quantitatively Managed</h2>
        <p className="text-gray-600">
          Teams rely on metrics and advanced tools for decision-making, automating
          testing, and fostering continuous delivery practices...
        </p>
      </div>
      <h1 className="font-sans font-bold text-3xl mb-20">Teams</h1>
      <div className="font-sans text-2xl flex flex-row space-x-4">
        <div>Following</div>
        <div>Explore</div>
        <div>Invitation</div>
      </div>
      <input
        type="text"
        placeholder="Search meetings..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-2/5"
      />
      <div className="text-md font-sans">{teamsData.length} Teams</div>
      <div className="flex-grow">
        <div>
          <TeamList teams={filteredTeams} />
        </div>
      </div>
    </div>
  </div>
  <div className="h-screen w-1/5">
    <div className="p-5">
      <div className="font-bold text-2xl">Team Updates</div>
      <div className="h-full">
        <TeamUpdate teams={teamsData} />
      </div>
    </div>
  </div>
</div>

  );
}
