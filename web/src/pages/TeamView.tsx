import Card from '@/components/Card/Card';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import TeammateList from '@/components/TeammateList/TeammateList';
import { Teammate } from '@/types/interfaces/types';

const teammates: Teammate[] = [
  {
    id: 1,
    name: 'Ethan Pineda',
    role: 'Software Engineer',
    avatarURL: '',
    contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
  },
  {
    id: 2,
    name: 'Brianna Gallardo',
    role: 'Product Manager',
    avatarURL: '',
    contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
  },
  {
    id: 3,
    name: 'Miya Liu',
    role: 'Software Engineer',
    avatarURL: '',
    contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
  },
  {
    id: 4,
    name: 'Chelsey Tao',
    role: 'Software Engineer',
    avatarURL: '',
    contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
  },
  {
    id: 5,
    name: 'Martin Kong',
    role: 'Software Engineer',
    avatarURL: '',
    contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
  },
];
        
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
