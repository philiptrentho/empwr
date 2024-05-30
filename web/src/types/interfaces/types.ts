import { DocumentReference } from 'firebase/firestore';

export interface User {
  userId: number;
  name: string;
  avatarURL: string | null;
  job: string;
  teams: DocumentReference[];
  metrics: Metric[];
}

export interface TeamData {
  name: string;
  follow: boolean;
  permissions: 'viewer' | 'admin'; // assuming these are the only possible values
  decisions: string[];
  positiveScore: number;
  severity: number;
}

export interface OrgTeamStatsProps {
  teamName: string;
  meetingTime: number;
  meetingPercentage: number;
  decisions: string[];
  severity: number;
}

export interface OrgViewChartProps {
  heading: string;
  chart: JSX.Element;
}

export interface Teammate {
  contribution: number;
  agile: number;
  codeQuality: number;
  modernTechStack: number;
  contributionPercent: number;
  userId: DocumentReference;
  user: User;
}

export interface FrameContainerProps {
  user: User;
}

export interface dummyType {
  name: string;
}

export interface UserId {
  userId: string;
}

export interface Meeting {
  attendee: string[];
  end: Date;
  eventId: string;
  ownerId: number;
  start: Date;
  title: string;
  topic: string;
  timeOnTopic: number;
  numDecisions: number;
}

export interface StrNumArr {
  Topic: string;
  Occurrence: number;
}

export interface Team {
  follow: boolean;
  followers: string[];
  LastUpdated: string;
  name: string;
  MeetingTopics: { Topic: string; Occurrence: number }[];
  Permissions: string;
  insights: number;
  maturity: number;
  activeIssues: number;
  invitations: string[];
  teamID: string;
}

export interface detailedTeam {
  activeIssues: number;
  admin: DocumentReference[];
  contributors: DocumentReference[];
  emergingThemes: string[];
  followers: DocumentReference[];
  insights: number;
  invitedParticipants: DocumentReference[];
  lastUpdated: Date;
  name: string;
  positiveScore: number;
  recommendations: string[];
  results: string;
  technicalExcellenceScore: number;
  userStats: Teammate[];
  viewers: DocumentReference[];
  maturity: number;
}

export interface Action {
  actionItems: {
    action: string;
    name: string;
  }[];
  meetingId: string;
}

export interface NavigationBarProps {
  navNumber: number;
  setNavNumber: (value: number) => void;
}

export interface Users {
  name: string;
  id: string;
}

export interface LocationState {
  userId: string;
}

export interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  team: DocumentReference;
  assignedTo: DocumentReference[];
}

export interface Metric {
  // used in individualData
  title: string;
  description: string;
  summary: string;
  score: number; // Assuming score is between 0 to 10
}

export interface DecisionsProps {
  topics: string[];
  counts: number[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

export interface BarData {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarData[];
}

export interface MeetingTimeChartProps {
  topics: string[];
  times: number[];
}

export interface DropdownOption {
  value: string;
  label: string;
}
