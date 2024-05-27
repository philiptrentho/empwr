import ProgressBar from '../ProgressBar/ProgressBar';

export default function InfoCard() {
  return (
    <div className="flex space-x-4">
      {/* Card */}
      <div className="bg-emerald-100 p-6 rounded-lg shadow-lg w-72 min-h-60 max-h-100 flex flex-col justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-lg font-semibold"> Technical Excellence </h2>
            <p className="text-gray-600">
              Assessing code quality, system design, and tech choices
            </p>
          </div>
        </div>
        <div className="align-bottom">
          <ProgressBar level={2} maxLevel={5} />
        </div>
      </div>
    </div>
  );
}
