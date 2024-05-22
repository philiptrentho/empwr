import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
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
export interface Teammate {
  id: number;
  name: string;
  role: string;
  avatarURL: string;
  contributions: string[]; // this is going to be dummy data for now until we figure out what the contributions are
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
