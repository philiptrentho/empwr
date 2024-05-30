import { MeetingAttendee, UpcomingMeetingCardProps } from '@/types/interfaces/types';

import MeetingAttendeeCard from '../MeetingAttendeeCard/MeetingAttendeeCard';

const UpcomingMeetingsCard: React.FC<UpcomingMeetingCardProps> = ({
  meetingTitle,
  meetingDate,
  meetingStartTime,
  meetingEndTime,
  attendees,
}) => {
  const convertDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  };

  const dummyTasks = [
    'Review last sprint progress',
    'Discuss upcoming sprint goals',
    'Assign new tasks to team members',
    'Review code quality metrics',
    'Plan for product launch',
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg mb-4">
      <h3 className="text-lg font-semibold">{meetingTitle}</h3>
      <p className="py-4 font-semibold">{convertDate(meetingDate)}</p>
      <p className="font-semibold">
        {meetingStartTime} - {meetingEndTime}
      </p>
      <h4 className="text-md font-medium mt-2">Attendees</h4>
      <div className="flex flex-wrap gap-4 py-4">
        {attendees.map((attendee: MeetingAttendee, index: number) => (
          <MeetingAttendeeCard
            key={index}
            name={attendee.name}
            avatarURL={attendee.avatarURL}
          />
        ))}
      </div>
      <h4 className="text-md font-semibold mt-2">Meeting Tasks/Goals</h4>
      <div className="flex flex-wrap gap-2">
        {dummyTasks.map((task, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded-lg shadow-sm mt-2">
            <p className="py-2 text-gray-700 text-sm font-medium">{task}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeetingsCard;
