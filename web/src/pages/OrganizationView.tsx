import { useEffect, useState } from 'react';

import Decisions from '@/components/Decisions/Decisions';
import { fetchOrgMeetings, getTeamInfo } from '@/components/Firebase/organizationData';
import MaturityScore from '@/components/MaturityScore/MaturityScore';
import MeetingTimeChart from '@/components/MeetingTimeChart/MeetingTimeChart';
import OrgTeamStats from '@/components/OrgTeamStats/OrgTeamStats';
import { OrgTeamStatsProps } from '@/types/interfaces/types';
import { Meeting } from '@/types/interfaces/types';

export default function OrganizationView() {
  const [teams, setTeams] = useState<OrgTeamStatsProps[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  useEffect(() => {
    console.log('OrganizationView');
    getTeamInfo('organizationID1')
      .then((teams) => {
        console.log(teams);
        setTeams(teams);
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
      });
    fetchOrgMeetings('organizationID1')
      .then((meetings) => {
        console.log(meetings, 'here');
        setMeetings(meetings);
      })
      .catch((error) => {
        console.error('Error fetching meetings:', error);
      });
  }, []);

  const topics: string[] = meetings.map((meeting) => meeting.topic);
  const times: number[] = meetings.map((meeting) => meeting.timeOnTopic);
  const counts: number[] = meetings.map((meeting) => meeting.numDecisions);
  return (
    <div>
      <div className="h-20 flex items-center justify-between border-b px-6">
        <p className="text-sm">
          <span className="text-gray-500">Organization:</span> Model e Software Leadership
        </p>

        <div className="flex items-center px-3 py-1 bg-emerald-500 text-white rounded-full">
          <p className="text-xs">4 active meetings</p>
        </div>
      </div>

      <div className="flex flex-col gap-8 px-6 py-10">
        <div className="flex w-full gap-8 flex-wrap">
          <MeetingTimeChart topics={topics} times={times} />
          <MaturityScore />
          <Decisions topics={topics} counts={counts} />
        </div>

        <h1 className="font-medium">Teams</h1>
        <div className="flex flex-col gap-4">
          {teams.map((team, index) => (
            <OrgTeamStats
              teamName={team.teamName}
              meetingTime={team.meetingTime}
              meetingPercentage={team.meetingPercentage}
              decisions={team.decisions}
              severity={team.severity}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
