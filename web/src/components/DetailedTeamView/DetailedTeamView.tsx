import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { detailedTeam } from '@/types/interfaces/types';

import Card from '../Card/Card';
import { fetchTeamDetails } from '../Firebase/detailedTeamData';
import InfoCard from '../InfoCard/InfoCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import TeammateList from '../TeammateList/TeammateList';
import UpcomingMeetingsCard from '../UpcomingMeetingsCard/UpcomingMeetingsCard';

const upcomingMeetings = [
  {
    title: 'Sprint Planning',
    meetingTitle: 'Sprint Planning',
    meetingDate: '2024-05-25',
    meetingStartTime: '10:00 AM',
    meetingEndTime: '11:00 AM',
    meetingLocation: 'Room 301',
    attendees: [
      { name: 'Alice', avatarURL: null },
      { name: 'Bob', avatarURL: null },
    ],
  },
  {
    title: 'Team Sync',
    meetingTitle: 'Team Sync',
    meetingDate: '2024-05-26',
    meetingStartTime: '11:00 AM',
    meetingEndTime: '12:00 PM',
    meetingLocation: 'Room 302',
    attendees: [
      { name: 'Charlie', avatarURL: null },
      { name: 'Dave', avatarURL: null },
    ],
  },
  {
    title: 'Project Review',
    meetingTitle: 'Project Review',
    meetingDate: '2024-05-27',
    meetingStartTime: '02:00 PM',
    meetingEndTime: '03:00 PM',
    meetingLocation: 'Room 303',
    attendees: [
      { name: 'Eve', avatarURL: null },
      { name: 'Frank', avatarURL: null },
    ],
  },
];

export default function DetailedTeamView() {
  const { teamID } = useParams();
  const [team, setTeam] = useState<detailedTeam | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (teamID) {
      fetchTeamDetails(teamID)
        .then((team) => {
          setTeam(team);
          console.log('Team:', team);
        })
        .catch((error) => {
          console.error('Error fetching teammates:', error);
        });
    }
  }, [teamID]);

  return (
    <div className="p-6 bg-gray-100 text-gray-900 min-h-screen">
      <button
        onClick={() => navigate('/TeamView')}
        className="p-2 mb-4 text-lg font-semibold bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      {team === null ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-xl">Loading...</div>
        </div>
      ) : (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-semibold mb-2">{team.name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card title="Upcoming Meetings" value={team.invitedParticipants.length} />
            <Card title="Tasks Completed" value={team.contributors.length} />
            <Card title="Recommendations" value={team.recommendations.length} />
            <Card title="Active Issues" value={team.activeIssues} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting, index) => (
                  <UpcomingMeetingsCard
                    key={index}
                    meetingTitle={meeting.meetingTitle}
                    meetingDate={meeting.meetingDate}
                    meetingStartTime={meeting.meetingStartTime}
                    meetingEndTime={meeting.meetingEndTime}
                    meetingLocation={meeting.meetingLocation}
                    attendees={meeting.attendees}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Decisions</h2>
                <div className="space-y-4">
                  {/* @ts-expect-error - idk what this is */}
                  {team.decisions.map((decision, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
                      {decision}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Results</h2>
                <div className="p-4 bg-gray-50 rounded-lg shadow-md">{team.results}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Teammates</h2>
            <TeammateList teammates={team.userStats} />
          </div>
        </>
      )}
    </div>
  );
}
