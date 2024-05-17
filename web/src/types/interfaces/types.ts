import { QueryDocumentSnapshot, DocumentSnapshot, collection, getDocs, doc, getDoc, getFirestore, DocumentData } from 'firebase/firestore';
export interface User {
  id: number;
  name: string;
  avatarURL: string;
  email: string;
  teamColor: string;
}

export interface Teammate {
  id: number;
  name: string;
  role: string;
  avatarURL: string;
  contributions: string[]; // this is going to be dummy data for now until we figure out what the contributions are
  
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
export interface Team {
  follow: boolean;
  followers: string[];
  LastUpdated: number;
  name: String;
  Permissions: String;
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
