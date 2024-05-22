import { Task } from '@/types/interfaces/types';
import TaskCard from '../TaskCard/TaskCard';
import UpcomingMeetingCard from '../UpcomingMeetingsCard/UpcomingMeetingsCard';
import { useEffect, useState } from 'react';
import { fetchUserDetails, fetchUserTasks } from '../Firebase/individualData';
interface Metric {
  title: string;
  description: string;
  summary: string;
  score: number; // Assuming score is between 0 to 10
}


interface Meeting {
  meetingTitle: string;
  meetingDescription?: string;
  meetingDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  meetingLocation: string;
}

const metrics: Metric[] = [
  {
    title: 'Technical Excellence',
    description: 'Assessing code quality, system design, and tech choices.',
    summary: 'Excellent',
    score: 8.5,
  },
  {
    title: 'Development Practices',
    description: 'Evaluation of coding frameworks, processes, and delivery methods.',
    summary: 'Good',
    score: 7.2,
  },
  {
    title: 'Operational Excellence',
    description: 'Evaluation of coding frameworks, processes, and delivery methods.',
    summary: 'Excellent',
    score: 9.0,
  },
  {
    title: 'Team Dynamics',
    description: 'Gauge of team collaboration, skills, and satisfaction levels.',
    summary: 'Very Good',
    score: 8.0,
  },
  {
    title: 'Innovation',
    description: 'Measurement of research dedication and tech modernity.',
    summary: 'Good',
    score: 7.8,
  },
  {
    title: 'Delivery and Results',
    description: 'Review of software output frequency and stakeholder satisfaction.',
    summary: 'Very Good',
    score: 8.4,
  },
  {
    title: 'Culture & Values',
    description: 'Insights into organizational beliefs, openness, and inclusivity.',
    summary: 'Excellent',
    score: 9.1,
  },
  {
    title: 'Business Alignment',
    description: 'Examining software’s alignment with broader business goals.',
    summary: 'Good',
    score: 7.5,
  },
];

const upcomingMeetings: Meeting[] = [
  {
    meetingTitle: 'Sprint Planning',
    meetingDate: '2024-05-25',
    meetingStartTime: '10:00 AM',
    meetingEndTime: '11:00 AM',
    meetingLocation: 'Room 301',
  },
  {
    meetingTitle: 'Team Sync',
    meetingDate: '2024-05-26',
    meetingStartTime: '11:00 AM',
    meetingEndTime: '12:00 PM',
    meetingLocation: 'Room 302',
  },
  {
    meetingTitle: 'Project Review',
    meetingDate: '2024-05-27',
    meetingStartTime: '02:00 PM',
    meetingEndTime: '03:00 PM',
    meetingLocation: 'Room 303',
  },
];

const getBarColor = (score: number) => {
  if (score >= 8) return 'bg-green-400';
  if (score >= 6) return 'bg-yellow-400';
  return 'bg-red-400';
};

const IndividualDashboard: React.FC = () => {
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchUserTasks('userID1')
      .then((tasks) => {
        console.log(tasks)
        setCurrentTasks(tasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  },[]);

  // useEffect(() => {
  //   let tasks = currentTasks.filter((task) => task.status !== 'Completed');
  //   setCurrentTasks(tasks);
  // }, [currentTasks]);

  return (
    <div className="p-6 bg-gray-100 text-gray-900 min-h-screen">
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-2xl font-bold mb-4">Hi, NAME</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="col-span-2 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Metrics List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
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
                />
              ))}
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Current Tasks</h2>
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
