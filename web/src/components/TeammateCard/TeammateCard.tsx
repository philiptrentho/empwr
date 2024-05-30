import { Link } from 'react-router-dom';

import { Teammate } from '@/types/interfaces/types';
export default function TeammateCard(teammate: Teammate) {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-indigo-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold">
            {teammate.user.name.charAt(0)}
          </div>
          <div>
            <Link to={`/teammate/${teammate.user.userId}`}>
              <h2 className="text-lg font-semibold hover:text-indigo-600 transition duration-300">
                {teammate.user.name}
              </h2>
            </Link>
            <p className="text-gray-600">{teammate.user.job}</p>
          </div>
        </div>
        <div className="bg-gray-200 h-2 rounded-full mb-4">
          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
        <p className="text-right text-gray-600 mb-4">2/3 Action Items Completed</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-600">{teammate.codeQuality}%</span>
            <span className="text-indigo-600 font-semibold bg-gray-200 rounded-full px-3 py-1">
              Code Quality Optimization
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-600">100%</span>
            <span className="text-indigo-600 font-semibold bg-gray-200 rounded-full px-3 py-1">
              Modern Tech Stack Alignment
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-600">100%</span>
            <span className="text-indigo-600 font-semibold bg-gray-200 rounded-full px-3 py-1">
              Agile Methodology Effectiveness
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
