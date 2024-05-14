import MeetingTimeChart from "@/components/MeetingTimeChart/MeetingTimeChart";

export default function OrganizationView() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0">
        <MeetingTimeChart />
      </div>
    </div>
  );
}
