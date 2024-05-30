import { DocumentReference } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Task, User } from '@/types/interfaces/types';
import { Meeting } from '@/types/interfaces/types';

import { fetchUserDetails, fetchUserTasks } from '../Firebase/individualData';
import TaskCard from '../TaskCard/TaskCard';
import UpcomingMeetingCard from '../UpcomingMeetingsCard/UpcomingMeetingsCard';

const upcomingMeetings: Meeting[] = [
  {
    title: 'Sprint Planning',
    meetingTitle: 'Sprint Planning',
    meetingDate: '2024-05-25',
    meetingStartTime: '10:00 AM',
    meetingEndTime: '11:00 AM',
    meetingLocation: 'Room 301',
    attendee: [],
    end: new Date('2024-05-25T11:00:00'),
    eventId: '1',
    ownerId: 1,
    start: new Date('2024-05-25T10:00:00'),
    topic: 'Sprint Planning',
    timeOnTopic: 60,
    numDecisions: 0,
  },
  {
    title: 'Team Sync',
    meetingTitle: 'Team Sync',
    meetingDate: '2024-05-26',
    meetingStartTime: '11:00 AM',
    meetingEndTime: '12:00 PM',
    meetingLocation: 'Room 302',
    attendee: [],
    end: new Date('2024-05-26T12:00:00'),
    eventId: '2',
    ownerId: 1,
    start: new Date('2024-05-26T11:00:00'),
    topic: 'Team Sync',
    timeOnTopic: 60,
    numDecisions: 0,
  },
  {
    title: 'Project Review',
    meetingTitle: 'Project Review',
    meetingDate: '2024-05-27',
    meetingStartTime: '02:00 PM',
    meetingEndTime: '03:00 PM',
    meetingLocation: 'Room 303',
    attendee: [],
    end: new Date('2024-05-27T15:00:00'),
    eventId: '3',
    ownerId: 1,
    start: new Date('2024-05-27T14:00:00'),
    topic: 'Project Review',
    timeOnTopic: 60,
    numDecisions: 0,
  },
];

// these are only rendered if the fetch fails which only happens if this user doesn't have any tasks
const dummyActionItems: Task[] = [
  {
    title: 'Finish Project Proposal',
    description: 'Complete the project proposal and submit it for review.',
    dueDate: '2024-05-23',
    priority: 'High',
    status: 'In Progress',
    team: {} as DocumentReference,
    assignedTo: [] as DocumentReference[],
  },
  {
    title: 'Refactor Login Module',
    description: 'Refactor the login module to use the new authentication service.',
    dueDate: '2024-05-23',
    priority: 'High',
    status: 'In Progress',
    team: {} as DocumentReference,
    assignedTo: [] as DocumentReference[],
  },

  {
    title: 'Update User Profile',
    description: 'Update the user profile page to include new fields.',
    dueDate: '2024-05-30',
    priority: 'Medium',
    status: 'Not Started',
    team: {} as DocumentReference,
    assignedTo: [] as DocumentReference[],
  },
];

const getBarColor = (score: number) => {
  if (score >= 8) return 'bg-green-400';
  if (score >= 6) return 'bg-yellow-400';
  return 'bg-red-400';
};

const IndividualDashboard: React.FC = () => {
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);

  const [user, setUser] = useState<User | null>(null);
  const { userID } = useParams<{ userID: string }>();
  console.log(userID);
  useEffect(() => {
    // @ts-expect-error - expects a string, but received undefined
    fetchUserTasks(userID)
      .then((tasks) => {
        console.log(tasks);
        setCurrentTasks(tasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setCurrentTasks(dummyActionItems);
      });
  }, []);

  useEffect(() => {
    // @ts-expect-error - expects a string, but received undefined
    fetchUserDetails(userID).then((user) => {
      console.log(user);
      setUser(user);
    }),
      [];
  }, []);

  return (
    <div className="p-6 bg-gray-100 text-gray-900 min-h-screen">
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-2xl font-bold mb-4">Hi, {user?.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="col-span-2 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Metrics List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {user &&
                user.metrics.map((metric, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
                    <p>{metric.description}</p>
                    <p className="font-bold mt-2">{metric.summary}</p>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
                        <div
                          style={{ width: `${metric.score * 10}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getBarColor(metric.score)}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting, index) => (
                <UpcomingMeetingCard
                  key={index}
                  meetingTitle={meeting.meetingTitle}
                  meetingDate={meeting.meetingDate}
                  meetingStartTime={meeting.meetingStartTime}
                  meetingEndTime={meeting.meetingEndTime}
                  meetingLocation={meeting.meetingLocation}
                  // @ts-expect-error - idk why this is failing
                  attendees={meeting.attendee}
                />
              ))}
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Action Items</h2>
            <div className="space-y-4">
              {currentTasks.map((task, index) => (
                <TaskCard
                  key={index}
                  taskTitle={task.title}
                  taskDescription={task.description}
                  taskDueDate={task.dueDate}
                  taskPriority={task.priority}
                  taskStatus={task.status}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDashboard;
