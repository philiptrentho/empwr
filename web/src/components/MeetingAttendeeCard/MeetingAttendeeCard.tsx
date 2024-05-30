import { MeetingAttendeeCardProps } from '@/types/interfaces/types';

const MeetingAttendeeCard: React.FC<MeetingAttendeeCardProps> = ({ name, avatarURL }) => {
  return (
    <div className="flex items-center space-x-2">
      {avatarURL ? (
        <img src={avatarURL} alt={name} className="w-8 h-8 rounded-full" />
      ) : (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          {name.charAt(0)}
        </div>
      )}
      <span>{name}</span>
    </div>
  );
};

export default MeetingAttendeeCard;
