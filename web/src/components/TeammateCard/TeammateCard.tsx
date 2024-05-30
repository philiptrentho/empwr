import { Link } from 'react-router-dom';

import { Teammate } from '@/types/interfaces/types';
export default function TeammateCard(teammate: Teammate) {
  return (
    <div className="flex space-x-4">
      {/* Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-72">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 text-white w-12 h-12 flex items-center justify-center rounded-full">
            RA
          </div>
          <div>
            <Link to={`/teammate/${teammate.user.userId}`}>
              <h2 className="text-lg font-semibold">{teammate.user.name}</h2>
            </Link>
            <p className="text-gray-600">{teammate.user.job}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-gray-200 h-1 rounded-full">
            <div
              className="bg-indigo-600 h-1 rounded-full"
              style={{ width: '100%' }}
            ></div>
          </div>
          <p className="text-right text-gray-600 mt-1">1 / 1 Contributor</p>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{teammate.codeQuality}%</span>
            <span className="text-indigo-600">Code Quality Optimization</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">100%</span>
            <span className="text-indigo-600">Modern Tech Stack Alignment</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">100%</span>
            <span className="text-indigo-600">Agile Methodology Effectiveness</span>
          </div>
        </div>
      </div>
    </div>
  );
}
