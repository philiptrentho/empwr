import MeetingTimeChart from '@/components/MeetingTimeChart/MeetingTimeChart';
import Teams from '@/components/Teams/Teams';
import MaturityScore from '@/components/MaturityScore/MaturityScore';

export default function OrganizationView() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full gap-8 flex-wrap">
        <MeetingTimeChart />
        <MaturityScore />
      </div>

      <Teams />
    </div>
  );
}
