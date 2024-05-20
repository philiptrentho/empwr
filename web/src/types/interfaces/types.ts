export interface User {
  id: number;
  name: string;
  avatarURL: string;
  email: string;
  teamColor: string;
}

export interface OrgTeamStatsProps {
  teamName: string;
  meetingTime: number;
  meetingPercentage: number;
  decisionsLinked: number;
  decisionsNotLinked: number;
  maturity: number;
}

export interface OrgViewChartProps {
  heading: string;
  chart: any;
}
