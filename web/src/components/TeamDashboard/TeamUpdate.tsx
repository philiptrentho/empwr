
import React, { useEffect, useState } from 'react';
import { Team } from '../../types/interfaces/types';
import BarChart from '@/components/TeamDashboard/BarChart';

interface DropdownOption {
    value: string;
    label: string;
}
interface TeamListProps {
    teams: Team[];
}
function formatLastUpdate(hours: number): string {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    if (days === 0 && remainingHours === 0) {
        return "Last Updated less than an hour ago";
    } else if (days === 0) {
        return `Last Updated ${remainingHours} hour${remainingHours === 1 ? '' : 's'} ago`;
    } else if (remainingHours === 0) {
        return `Last Updated ${days} day${days === 1 ? '' : 's'} ago`;
    } else {
        return `Last Updated ${days} day${days === 1 ? '' : 's'} and ${remainingHours} hour${remainingHours === 1 ? '' : 's'} ago`;
    }
}

const TeamUpdate: React.FC<TeamListProps> = ({ teams }) => {
    const options: DropdownOption[] = [
        { value: 'option1', label: 'Last Updated' },
        { value: 'option2', label: 'Name' },
        { value: 'option3', label: 'Most Followed' }
    ];    
    const [searchQuery2, setSearchQuery2] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [filteredAndSortedTeams, setFilteredAndSortedTeams] = useState<Team[]>([]);
    const handleOptionClick = (option: DropdownOption) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    useEffect(() => {

        const filteredTeams = teams.filter(team =>
            team.name.toLowerCase().includes(searchQuery2.toLowerCase())
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
    }, [teams, searchQuery2, selectedOption]);
    return (
        <div>
            <input
                type="text"
                placeholder="Search meetings..."
                value={searchQuery2}
                onChange={e => setSearchQuery2(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <div className="flex items-center">
                <div>
                    21 Updates
                </div>
                &nbsp;
                &nbsp;
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
            </div>
            <div className="w-4/5 h-screen overflow-y-auto hide-scrollbar">
                {filteredAndSortedTeams.length > 0 ? (
                    filteredAndSortedTeams.map((team, index) => (
                        <div key={index} className="flex flex-col space-x-4 bg-white rounded p-4 mb-4 border border-gray-200">
                            <h2 className="font-bold text-lg mb-2">{team.name}</h2>
                            <p className="text-gray-400">{team.followers.length} members</p>
                            <p className="text-sm">{formatLastUpdate(team.LastUpdated)}</p>
                            <div>
                            <BarChart data={team.MeetingTopics.map(topic => ({ label: topic.Topic, value: topic.Occurrence }))} />
                            </div>
                        </div>
                    ))) : (
                    <p>No meetings found</p>
                )}
            </div>
        </div>
    );
};

export default TeamUpdate;