import {
  DocumentReference,
} from 'firebase/firestore';

export interface User {
  userId: number;
  name: string;
  avatarURL: string | null;
  job: string;
  teams: DocumentReference[];
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
  LastUpdated: number;
  name: string;
  MeetingTopics: StrNumArr[];
  Permissions: string;
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
