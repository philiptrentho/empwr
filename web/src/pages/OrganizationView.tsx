import MeetingTimeChart from "@/components/MeetingTimeChart/MeetingTimeChart";
import Teams from "@/components/Teams/Teams";
import MaturityScore from "@/components/MaturityScore/MaturityScore";

export default function OrganizationView() {
  return (
    <div className="relative">
      <div className="top-0 left-0">
        <MeetingTimeChart />
      </div>
      <div className = "mt-4">
        <MaturityScore />
      </div>
      
      <Teams />
    </div>
  );
}
