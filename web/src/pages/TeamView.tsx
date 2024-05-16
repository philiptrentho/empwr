import { fetchAllTeams, fetchAllActions, fetchAllMeetings, fetchMeetings, fetchUser } from '../components/Firebase/firebase';
import { Team } from '../types/interfaces/types';
import React, { useEffect, useState } from 'react';
import './TeamView.css';
import TeamList from '@/components/TeamDashboard/TeamList';

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

  const filteredTeams = teamsData.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-sans font-bold text-3xl mb-20">Teams</h1>
      <div className="font-sans text-2xl flex flex-row space-x-4">
        <div>Following </div>
        <div>Explore </div>
        <div>Invitation </div>
      </div>
      <input
        type="text"
        placeholder="Search meetings..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
      />
      <div className="flex-grow">
        <div>
            <TeamList teams={filteredTeams}/>

        </div>
      </div>
    </div>
  );
}
