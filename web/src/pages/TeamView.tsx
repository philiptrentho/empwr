import './TeamView.css';

import { LucideArrowLeftFromLine, LucideArrowRightToLine } from 'lucide-react';
import { useEffect, useState } from 'react';

import TeamList from '@/components/TeamDashboard/TeamList';
import TeamUpdate from '@/components/TeamDashboard/TeamUpdate';
import { Team } from '@/types/interfaces/types';
import { DropdownOption } from '@/types/interfaces/types';

import { fetchAllUpdatedTeams } from '../components/Firebase/firebase';
import CreateTeamModal from './CreateTeamModal';

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
    { value: 'option3', label: 'Most Followed' },
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
  const userID = 'userID6';
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
    const filteredTeams = teamsData.filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Applying the sort based on the selected option
    let sortedTeams = [...filteredTeams];
    if (selectedOption?.value === 'option1') {
      sortedTeams = sortByLastUpdated(sortedTeams);
    } else if (selectedOption?.value === 'option2') {
      sortedTeams = sortByName(sortedTeams);
    } else if (selectedOption?.value === 'option3') {
      sortedTeams = sortByFollowers(sortedTeams);
    }

    // Now apply tab-specific filtering after sorting
    switch (activeTab) {
      case 'Following':
        sortedTeams = sortedTeams.filter((team) => team.followers.includes(userID));
        break;
      case 'Explore':
        sortedTeams = sortedTeams.filter((team) => !team.followers.includes(userID));
        break;
      case 'Invitations':
        sortedTeams = sortedTeams.filter((team) => team.invitations.includes(userID));
        break;
    }

    setFilteredAndSortedTeams(sortedTeams);
  }, [teamsData, searchQuery, selectedOption, activeTab]);

  return (
    <div className="TeamView flex flex-row">
      <div className="flex-grow">
        <div className="p-5 space-y-4">
          <h1 className="font-sans font-bold text-3xl mb-20">Teams</h1>

          <div className="tab-horizontal">
            <div
              className={`tab-container ${activeTab === 'Following' ? 'active' : ''}`}
              onClick={() => setActiveTab('Following')}
            >
              <p style={{ fontSize: '19px' }}>Following</p>
              <div
                style={{
                  height: '3px',
                  backgroundColor: activeTab === 'Following' ? '#271463' : 'gray',
                }}
              ></div>
            </div>
            <div
              className={`tab-container ${activeTab === 'Explore' ? 'active' : ''}`}
              onClick={() => setActiveTab('Explore')}
            >
              <p style={{ fontSize: '19px' }}>Explore</p>
              <div
                style={{
                  height: '3px',
                  backgroundColor: activeTab === 'Explore' ? '#271463' : 'gray',
                }}
              ></div>
            </div>
            <div
              className={`tab-container ${activeTab === 'Invitations' ? 'active' : ''}`}
              onClick={() => setActiveTab('Invitations')}
            >
              <p style={{ fontSize: '19px' }}>Invitations</p>
              <div
                style={{
                  height: '3px',
                  backgroundColor: activeTab === 'Invitations' ? '#271463' : 'gray',
                }}
              ></div>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <input
              type="text"
              placeholder="Search Teams..."
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
                  {selectedOption ? selectedOption.label : 'Sort By'}
                </button>
                <svg
                  className={`ml-1 -mr-1 h-4 w-4 transition-transform duration-200 transform ${
                    isOpen ? 'rotate-180' : 'rotate-0'
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
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
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
              <TeamList
                teams={filteredAndSortedTeams}
                typeData={activeTab}
                userID={userID}
                refreshTeams={fetchData}
              />
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
      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        setSubmitTrigger={setSubmitTrigger}
      />
    </div>
  );
}
export { sortByFollowers, sortByLastUpdated, sortByName };
