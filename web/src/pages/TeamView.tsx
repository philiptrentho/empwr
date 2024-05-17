import { fetchAllTeams, fetchAllActions, fetchAllMeetings, fetchMeetings, fetchUser } from '../components/Firebase/firebase';
import { Team } from '../types/interfaces/types';
import React, { useEffect, useState } from 'react';
import './TeamView.css';
import TeamList from '@/components/TeamDashboard/TeamList';
import TeamUpdate from '@/components/TeamDashboard/TeamUpdate';


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
    <div className="flex flex-row justify-between h-screen">
      <div className="w-3/4">
        <h1 className="font-sans font-bold text-3xl mb-20">Teams</h1>
        <div className="font-sans text-2xl flex flex-row space-x-4">
          <div>Following </div>
          <div>Explore </div>
          <div>Invitation </div>
        </div>
        <br></br>
        <input
          type="text"
          placeholder="Search meetings..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-2/5"
        />
        <div className="text-md font-sans">
          {teamsData.length} Teams
        </div>
        <br></br>
        <div className="flex-grow">
          <div>
            <TeamList teams={filteredTeams} />

          </div>
        </div>
      </div>
      <div className="h-screen w-1/5">
        <div className="font-bold text-2xl">
          Team Updates
        </div>
       
        <div className="h-full flex-grow">
          <div className="h-full">
            <TeamUpdate teams={filteredTeams}/>

          </div>
        </div>
      </div>
    </div>
  );
}
