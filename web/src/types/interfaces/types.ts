import { DocumentReference } from 'firebase/firestore';

export interface User {
  userId: number;
  name: string;
  avatarURL: string | null;
  job: string;
  teams: DocumentReference[];
  metrics: Metric[];
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
  chart: unknown;
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
  MeetingTopics: StrNumArr[];
  Permissions: string;
  insights: number;
  maturity: number;
  activeIssues: number;
  invitations : string[];
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
