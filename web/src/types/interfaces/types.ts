export interface User {
  id: number;
  name: string;
  avatarURL: string;
  email: string;
  teamColor: string;
}

export interface FrameContainerProps {
  user: User;
}
