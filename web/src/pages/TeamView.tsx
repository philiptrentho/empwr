import React, { useState, useEffect } from 'react';
import TeamList from '@/components/TeamDashboard/TeamList';
import TeamUpdate from '@/components/TeamDashboard/TeamUpdate';
import { LucideArrowRightToLine, LucideArrowLeftFromLine, LucideUserPlus } from 'lucide-react';
import { fetchAllUpdatedTeams } from '../components/Firebase/firebase';
import { Team } from '../types/interfaces/types';
import CreateTeamModal from './CreateTeamModal';

interface DropdownOption {
  value: string;
  label: string;
}

const sortByLastUpdated = (teams: Team[]) => {
  return teams.sort((a, b) => {
    const dateA = new Date(a.LastUpdated);
    const dateB = new Date(b.LastUpdated);
    return dateB.getTime() - dateA.getTime();
  });
};

const sortByName = (teams: Team[]) => {
  return teams.sort((a, b) => a.name.localeCompare(b.name));
};

const sortByFollowers = (teams: Team[]) => {
  return teams.sort((a, b) => b.followers.length - a.followers.length);
};

export default function TeamView() {
  const options: DropdownOption[] = [
    { value: 'option1', label: 'Latest Update' },
    { value: 'option2', label: 'A-Z' },
    { value: 'option3', label: 'Most Followed' }
  ];

  const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const [filteredAndSortedTeams, setFilteredAndSortedTeams] = useState<Team[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('Following');
  const userID = "userID6";

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

  const fetchData = async () => {
    try {
      const fetchedTeamsData = await fetchAllUpdatedTeams();
      setTeamsData(fetchedTeamsData);
    } catch (error) {
      console.error('Error handling:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [submitTrigger]);

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

    switch (activeTab) {
      case 'Following':
        sortedTeams = sortedTeams.filter(team => team.followers.includes(userID));
        break;
      case 'Explore':
        sortedTeams = sortedTeams.filter(team => !team.followers.includes(userID));
        break;
      case 'Invitations':
        sortedTeams = sortedTeams.filter(team => team.invitations.includes(userID));
        break;
    }

    setFilteredAndSortedTeams(sortedTeams);
  }, [teamsData, searchQuery, selectedOption, activeTab]);

  return (
    <div className="flex flex-row">
      <div className="flex-grow">
        <div className="p-5 space-y-4">
          <h1 className="font-sans font-bold text-3xl mb-4">Teams</h1>

          <div className="flex flex-col w-full mb-24">
            <div className="flex">
              <div
                className={`tab-container ${activeTab === 'Following' ? 'active' : ''} flex-grow`}
                onClick={() => setActiveTab('Following')}
              >
                <p className="text-lg text-center">Following</p>
                <div className={`h-0.5 ${activeTab === 'Following' ? 'bg-[#271463]' : 'bg-gray-400'}`} />
              </div>
              <div
                className={`tab-container ${activeTab === 'Explore' ? 'active' : ''} flex-grow`}
                onClick={() => setActiveTab('Explore')}
              >
                <p className="text-lg text-center">Explore</p>
                <div className={`h-0.5 ${activeTab === 'Explore' ? 'bg-[#271463]' : 'bg-gray-400'}`} />
              </div>
              <div
                className={`tab-container ${activeTab === 'Invitations' ? 'active' : ''} flex-grow`}
                onClick={() => setActiveTab('Invitations')}
              >
                <p className="text-lg text-center">Invitations</p>
                <div className={`h-0.5 ${activeTab === 'Invitations' ? 'bg-[#271463]' : 'bg-gray-400'}`} />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center mb-24">
            <input
              type="text"
              placeholder="Search Teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-1/2"
            />
            <button
              className="text-[#271463] p-2"
              onClick={handleCreateTeamClick}
            >
              <LucideUserPlus size={24} />
            </button>
          </div>

          <div className="flex flex-row justify-between items-center mb-24">
            <div className="text-md font-sans">{teamsData.length} Teams</div>

            <div className="relative">
              <button className="dropdown-toggle flex items-center" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? selectedOption.label : 'Sort By'}
                <svg
                  className={`ml-1 -mr-1 h-4 w-4 transition-transform duration-200 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-.7.3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 border border-gray-700">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="dropdown-item px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-grow">
            <TeamList teams={filteredAndSortedTeams} typeData={activeTab} userID={userID} refreshTeams={fetchData} />
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
      <CreateTeamModal isOpen={isModalOpen} onClose={handleCloseModal} setSubmitTrigger={setSubmitTrigger} />
    </div>
  );
}

export { sortByLastUpdated, sortByName, sortByFollowers };
