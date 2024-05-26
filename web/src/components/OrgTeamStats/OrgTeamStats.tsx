import { OrgTeamStatsProps } from '@/types/interfaces/types';

export default function OrgTeamStats({
  teamName,
  meetingTime,
  meetingPercentage,
  decisions,
  severity,
}: OrgTeamStatsProps) {
  function getSentimentElement(sentiment: number) {
    let colour: string;

    if (severity > 0.2) {
      colour = 'bg-emerald-500';
    } else if (severity <= 0.2 && severity >= -0.2) {
      colour = 'bg-amber-400';
    } else {
      colour = 'bg-red-400';
    }

    if (sentiment < 0) {
      return (
        <div className="flex items-center">
          {sentiment === -1 ? (
            <></>
          ) : (
            <div
              className="w-2/4 h-2 bg-gray-200 rounded-l"
              style={{ width: `${(1 - Math.abs(sentiment)) * 50}%` }}
            ></div>
          )}

          {sentiment === -1 ? (
            <div
              className={`w-2/4 h-2 ${colour} rounded-l`}
              style={{ width: `${Math.abs(sentiment) * 50}%` }}
            ></div>
          ) : (
            <div
              className={`w-2/4 h-2 ${colour}`}
              style={{ width: `${Math.abs(sentiment) * 50}%` }}
            ></div>
          )}
          <div
            className="w-2/4 h-2 bg-gray-200 rounded-r"
            style={{ width: `${50}%` }}
          ></div>
        </div>
      );
    }
    return (
      <div className="flex items-center">
        <div
          className="w-2/4 h-2 bg-gray-200 rounded-l"
          style={{ width: `${50}%` }}
        ></div>
        {sentiment === 1 ? (
          <div
            className={`w-2/4 h-2 ${colour} rounded-r`}
            style={{ width: `${50}%` }}
          ></div>
        ) : (
          <div
            className={`w-2/4 h-2 ${colour}`}
            style={{ width: `${sentiment * 50}%` }}
          ></div>
        )}

        {sentiment === 1 ? (
          <></>
        ) : (
          <div
            className="w-2/4 h-2 bg-gray-200 rounded-r"
            style={{ width: `${(1 - sentiment) * 50}%` }}
          ></div>
        )}
      </div>
    );
  }

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

        {/* Maturity */}
        <div className="flex flex-col w-full gap-4 min-w-80 flex-1">
          <p>Sentiment</p>
          <div className="flex flex-col gap-2">
            {getSentimentElement(severity)}
            <div className="flex justify-between font-normal">
              <p>
                {severity} <span className="text-gray-500">sentiment</span>
              </p>
              <span>Measured</span>
            </div>
          </div>
        </div>

        {/* Decisions */}
        <div className="flex flex-col w-full gap-2 min-w-80 flex-1">
          <p>Recent Decisions</p>
          <div className="flex gap-4">
            <ul>
              {decisions.map((decision, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-gray-500">•</span>
                  <p>{decision}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
