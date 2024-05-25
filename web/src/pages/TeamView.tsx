import './TeamView.css';

import React, { useEffect, useState } from 'react';

import TeamList from '@/components/TeamDashboard/TeamList';
import TeamUpdate from '@/components/TeamDashboard/TeamUpdate';
import { LucideArrowRightToLine, LucideArrowLeftFromLine } from 'lucide-react';
import {
  fetchAllTeams,
} from '../components/Firebase/firebase';
import { Team, StrNumArr } from '../types/interfaces/types';
import CreateTeamModal from './CreateTeamModal';
interface DropdownOption {
  value: string;
  label: string;
}
export default function TeamView() {
  const options: DropdownOption[] = [
    { value: 'option1', label: 'Last Updated' },
    { value: 'option2', label: 'Name' },
    { value: 'option3', label: 'Most Followed' }
  ];
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const [filteredAndSortedTeams, setFilteredAndSortedTeams] = useState<Team[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleCreateTeamClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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


  useEffect(() => {

    const filteredTeams = teamsData.filter(team =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    let sortedTeams = [...filteredTeams];
    if (selectedOption?.value === 'option1') {
      sortedTeams.sort((a, b) => a.LastUpdated - b.LastUpdated);
    }
    if (selectedOption?.value === 'option2') {
      sortedTeams.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (selectedOption?.value === 'option3') {
      sortedTeams.sort((a, b) => a.followers.length - b.followers.length);
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
          <h1 className="font-sans font-bold text-3xl mb-20">Teams</h1>
          <div className="font-sans text-2xl flex flex-row space-x-4">
            <div>Following</div>
            <div>Explore</div>
            <div>Invitation</div>
          </div>
          <div className="flex flex-row justify-between">
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 mb-4 w-2/5"
            />

            <button
              className="create-team-btn p-2 bg-blue-500 text-white rounded"
              onClick={handleCreateTeamClick}

            >
              Create New Team
            </button>

            {/* Code below is same as filtering in team update. Should make separate component
            for filtering and search. I can do later if needed.
            */}
            <div className="dropdown">
              <div className="flex items-center">
                <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                  {selectedOption ? selectedOption.label : 'Filter By'}
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
      <CreateTeamModal isOpen={isModalOpen} onClose={handleCloseModal} />

    </div>

  );
}
