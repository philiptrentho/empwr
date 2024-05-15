import MeetingTimeChart from "@/components/MeetingTimeChart/MeetingTimeChart";
import Teams from "@/components/Teams/Teams";

export default function OrganizationView() {
  return (
    <div className="relative">
      <div className="top-0 left-0">
        <MeetingTimeChart />
      </div>
      <Teams />
    </div>
  );
}
