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
}
