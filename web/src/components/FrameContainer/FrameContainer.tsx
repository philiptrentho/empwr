import { FrameContainerProps } from '../../types/interfaces/types';
import React, { useState } from 'react';

export default function FrameContainer({ user }: FrameContainerProps) {
  let borderColorClass = '';
  let backgroundHoverColorClass = '';
  switch (user.teamColor) {
    case 'green':
      borderColorClass = 'border-green-500';
      backgroundHoverColorClass = 'hover:bg-green-50';
      break;
    case 'red':
      borderColorClass = 'border-rose-500';
      backgroundHoverColorClass = 'hover:bg-rose-50';
      break;
    case 'blue':
      borderColorClass = 'border-sky-500';
      backgroundHoverColorClass = 'hover:bg-sky-50';
      break;
    default:
      borderColorClass = 'border-gray-400';
      backgroundHoverColorClass = 'border-gray-50';
  }

  const [copied, setCopied] = useState(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('could not copy email');
    }
  };

  return (
    <div
      className={`border-2 rounded-xl p-6 ${borderColorClass} ${backgroundHoverColorClass}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 justify-start">
          <img
            src={user.avatarURL}
            alt="avatar"
            className="h-16 w-16 rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold">{user.name}</h2>
        </div>
        <div className="flex gap-2 items-center">
          <p>{user.email}</p>
          <div
            onClick={copyEmailToClipboard}
            onKeyDown={(e) => {
              if (e.key === 'Enter') copyEmailToClipboard();
            }}
            className={`flex items-center justify-center h-6 w-6 rounded ${
              copied ? 'bg-green-400' : 'bg-gray-200'
            } transition-all duration-300`}
          >
            <span className="material-symbols-rounded text-xs text-gray-600 cursor-">
              {copied ? 'done' : 'content_copy'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
