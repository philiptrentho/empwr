import Decisions from '@/components/Decisions/Decisions';
import MaturityScore from '@/components/MaturityScore/MaturityScore';
import MeetingTimeChart from '@/components/MeetingTimeChart/MeetingTimeChart';
import OrgTeamStats from '@/components/OrgTeamStats/OrgTeamStats';

export default function OrganizationView() {
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
          <MeetingTimeChart />
          <MaturityScore />
          <Decisions />
        </div>

        <h1 className="font-medium">Teams</h1>
        <div className="flex flex-col gap-4">
          <OrgTeamStats
            teamName="Vehicle software"
            meetingTime={45}
            meetingPercentage={70}
            decisions={['Decision 1', 'Decision 2']}
            severity={0.4}
          />

          <OrgTeamStats
            teamName="Platform systems"
            meetingTime={52}
            meetingPercentage={94}
            decisions={['Decision 1', 'Decision 2']}
            severity={-0.3}
          />
        </div>
      </div>
    </div>
  );
}
