interface UpcomingMeetingCardProps {
  meetingTitle: string;
  meetingDescription?: string;
  meetingDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  meetingLocation: string;
}

const UpcomingMeetingCard: React.FC<UpcomingMeetingCardProps> = ({
  meetingTitle,
  meetingDescription,
  meetingDate,
  meetingStartTime,
  meetingEndTime,
}) => {
  const convertDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">{meetingTitle}</h2>
      {meetingDescription && (
        <p className="text-sm text-gray-600">{meetingDescription}</p>
      )}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <p className="text-sm text-gray-600">Date: {convertDate(meetingDate)}</p>
          <p className="text-sm text-gray-600 ml-4">
            Time: {meetingStartTime} - {meetingEndTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeetingCard;
