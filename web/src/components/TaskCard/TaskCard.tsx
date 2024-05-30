import { TaskCardProps } from '@/types/interfaces/types';
const TaskCard: React.FC<TaskCardProps> = ({
  taskTitle,
  taskDescription,
  taskDueDate,
  taskPriority,
  taskStatus,
}) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">{taskTitle}</h2>
      <p className="text-sm text-gray-600">{taskDescription}</p>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <p className="text-sm text-gray-600">Due Date: {formatDate(taskDueDate)}</p>
          <p className="text-sm text-gray-600 ml-4">
            Priority:{' '}
            <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
              {taskPriority}
            </span>
          </p>
        </div>
        <p className="text-sm text-gray-600">
          Status:{' '}
          <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full">
            {taskStatus}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
