import './TeamView.css';

import React, { useEffect, useState } from 'react';

import TeamList from '@/components/TeamDashboard/TeamList';
import TeamUpdate from '@/components/TeamDashboard/TeamUpdate';
import { LucideArrowRightToLine, LucideArrowLeftFromLine } from 'lucide-react';
import {
  fetchAllUpdatedTeams
} from '../components/Firebase/firebase';
import { Team, StrNumArr } from '../types/interfaces/types';
interface DropdownOption {
  value: string;
  label: string;
}

const sortByLastUpdated = (teams: Team[]) => {
  return teams.sort((a, b) => {
    console.log('Date A:', a.LastUpdated);
    console.log('Date B:', b.LastUpdated);
    const dateA = new Date(a.LastUpdated);
    const dateB = new Date(b.LastUpdated);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
};


const sortByName = (teams: Team[]) => {
  return teams.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
};

const sortByFollowers = (teams: Team[]) => {
  return teams.sort((a, b) => b.followers.length - a.followers.length);
};

export default function TeamView() {
  const options: DropdownOption[] = [
    { value: 'option1', label: 'Lastest Update' },
    { value: 'option2', label: 'Lexicographic Order' },
    { value: 'option3', label: 'Most Followed' }
  ];
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const [filteredAndSortedTeams, setFilteredAndSortedTeams] = useState<Team[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeamsData = await fetchAllUpdatedTeams();
        setTeamsData(fetchedTeamsData);
      } catch (error) {
        console.error('Error handling:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {

    const filteredTeams = teamsData.filter(team =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    let sortedTeams = [...filteredTeams];
    if (selectedOption?.value === 'option1') {
      sortedTeams = sortByLastUpdated(sortedTeams);
    } else if (selectedOption?.value === 'option2') {
      sortedTeams = sortByName(sortedTeams);
    } else if (selectedOption?.value === 'option3') {
      sortedTeams = sortByFollowers(sortedTeams);
    }
    setFilteredAndSortedTeams(sortedTeams);
  }, [teamsData, searchQuery, selectedOption]);
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
          <div className="flex flex-row justify-between">
            <input
              type="text"
              placeholder="Search Teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 mb-4 w-2/5"
            />
            {/* Code below is same as filtering in team update. Should make separate component
            for filtering and search. I can do later if needed.
            */}
            <div className="dropdown">
              <div className="flex items-center">
                <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                  {selectedOption ? selectedOption.label : 'Sort By'}
                </button>
                <svg
                  className={`ml-1 -mr-1 h-4 w-4 transition-transform duration-200 transform ${isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-.7.3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {isOpen && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 border border-purple-700">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="dropdown-item px-4"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Filtering ends here */}
          </div>
          <div className="text-md font-sans">{teamsData.length} Teams</div>
          <div className="flex-grow">
            <div>
              <TeamList teams={filteredAndSortedTeams} />
            </div>
          </div>
        </div>
      </div>
      <button
        className="collapse-toggle p-2 bg-white-500 rounded h-2/6 font-sans text-6x1 text-blue-900"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <LucideArrowLeftFromLine /> : <LucideArrowRightToLine />}
      </button>
      {!collapsed && (
        <div className="p-5">
          <div className="font-bold text-2xl">Team Updates</div>
          <div className="h-full">
            <TeamUpdate teams={teamsData} />
          </div>
        </div>
      )}
    </div>

  );
}
export { sortByLastUpdated, sortByName, sortByFollowers };