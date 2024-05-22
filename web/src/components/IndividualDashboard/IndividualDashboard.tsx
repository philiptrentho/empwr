import TaskCard from '../TaskCard/TaskCard';
import UpcomingMeetingCard from '../UpcomingMeetingsCard/UpcomingMeetingsCard';
interface Metric {
  title: string;
  description: string;
  summary: string;
  score: number; // Assuming score is between 0 to 10
}

interface Task {
  taskTitle: string;
  taskDescription: string;
  taskDueDate: string;
  taskPriority: string;
  taskStatus: string;
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

// const upcomingMeetings = [
//   { title: 'Sprint Planning', date: '2024-05-25', time: '10:00 AM' },
//   { title: 'Team Sync', date: '2024-05-26', time: '11:00 AM' },
//   { title: 'Project Review', date: '2024-05-27', time: '02:00 PM' },
// ];

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

// const currentTasks = [
//   { title: 'Refactor Login Module', dueDate: '2024-05-23', as},
//   { title: 'Update Documentation', dueDate: '2024-05-24' },
//   { title: 'Bug Fixes', dueDate: '2024-05-25' },
// ];

const currentTasks: Task[] = [
  {
    taskTitle: 'Refactor Login Module',
    taskDescription: 'Refactor the login module to use the new authentication service.',
    taskDueDate: '2024-05-23',
    taskPriority: 'High',
    taskStatus: 'In Progress',
  },
  {
    taskTitle: 'Update Documentation',
    taskDescription: 'Update the project documentation with the latest changes.',
    taskDueDate: '2024-05-24',
    taskPriority: 'Medium',
    taskStatus: 'Not Started',
  },
  {
    taskTitle: 'Bug Fixes',
    taskDescription: 'Fix the critical bugs reported by the QA team.',
    taskDueDate: '2024-05-25',
    taskPriority: 'High',
    taskStatus: 'Not Started',
  },
];

const getBarColor = (score: number) => {
  if (score >= 8) return 'bg-green-400';
  if (score >= 6) return 'bg-yellow-400';
  return 'bg-red-400';
};

const IndividualDashboard: React.FC = () => {
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
                  taskTitle={task.taskTitle}
                  taskDescription={task.taskDescription}
                  taskDueDate={task.taskDueDate}
                  taskPriority={task.taskPriority}
                  taskStatus={task.taskStatus}
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
