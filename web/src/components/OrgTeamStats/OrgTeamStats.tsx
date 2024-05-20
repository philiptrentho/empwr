import { OrgTeamStatsProps } from '@/types/interfaces/types';

export default function OrgTeamStats({
  teamName,
  meetingTime,
  meetingPercentage,
  decisionsLinked,
  decisionsNotLinked,
  maturity,
}: OrgTeamStatsProps) {
  return (
    <div className="px-6 py-4 border rounded-lg flex flex-col gap-2 text-xs font-medium">
      <p className="font-semibold">{teamName}</p>

      <div className="flex flex-wrap gap-12">
        {/* Meeting Time */}
        <div className="flex flex-col w-full gap-4 min-w-80 flex-1">
          <p>Meeting Time</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div
                className="h-2 rounded-l"
                style={{ width: `${meetingPercentage}%`, backgroundColor: '#4D388E' }}
              ></div>
              <div
                className="w-1/4 h-2 bg-gray-200 rounded-r"
                style={{ width: `${100 - meetingPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between font-normal">
              <p>
                {meetingTime} <span className="text-gray-500">minutes</span>
              </p>
              <span>{meetingPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Decisions */}
        <div className="flex flex-col w-full gap-2 min-w-80 flex-1">
          <p>Decisions</p>
          <div className="flex gap-4 text-white">
            <div
              className="w-full px-4 py-3 rounded-sm"
              style={{ backgroundColor: '#4D388E' }}
            >
              {decisionsLinked} <span className="text-violet-300">decisions linked</span>
            </div>
            <div className="bg-sky-400 w-full px-4 py-3 rounded-sm">
              {decisionsNotLinked}{' '}
              <span className="text-sky-200">decisions not linked</span>
            </div>
          </div>
        </div>

        {/* Maturity */}
        <div className="flex flex-col w-full gap-4 min-w-80 flex-1">
          <p>Maturity</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div
                className="w-2/4 h-2 bg-emerald-500 rounded-l"
                style={{ width: `${(maturity / 5) * 100}%` }}
              ></div>
              <div
                className="w-2/4 h-2 bg-gray-200 rounded-r"
                style={{ width: `${((5 - maturity) / 5) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between font-normal">
              <p>
                {maturity} <span className="text-gray-500">maturity</span>
              </p>
              <span>Measured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
