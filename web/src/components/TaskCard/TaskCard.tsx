interface TaskCardProps {
  taskTitle: string;
  taskDescription: string;
  taskDueDate: string;
  taskPriority: string;
  taskStatus: string;
}

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
          <p className="text-sm text-gray-600 ml-4">Priority: {taskPriority}</p>
        </div>
        <p className="text-sm text-gray-600">Status: {taskStatus}</p>
      </div>
    </div>
  );
};

export default TaskCard;
