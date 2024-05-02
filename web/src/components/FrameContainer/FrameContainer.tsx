import { FrameContainerProps } from '../../types/interfaces/types';
export default function FrameContainer({ user }: FrameContainerProps) {
  let borderColorClass = '';
  switch (user.teamColor) {
    case 'green':
      borderColorClass = 'border-green-400';
      break;
    case 'red':
      borderColorClass = 'border-red-400';
      break;
    case 'blue':
      borderColorClass = 'border-blue-400';
      break;
    default:
      borderColorClass = 'border-gray-400';
  }

  return (
    <div className={`border-4 rounded-lg p-6 ${borderColorClass}`}>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <img
          src={user.avatarURL}
          alt="avatar"
          className="h-16 w-16 rounded object-cover"
        />
        <p>{user.email}</p>
      </div>
    </div>
  );
}
