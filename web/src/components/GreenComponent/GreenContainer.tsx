import { useState } from 'react';

import { FrameContainerProps } from '@/types/interfaces/types';

export default function GreenContainer({ user }: FrameContainerProps) {
  const borderColorClass = 'border-green-500';
  const backgroundHoverColorClass = 'hover:bg-green-50';

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
          <button
            onClick={copyEmailToClipboard}
            onKeyDown={(e) => {
              if (e.key === 'Enter') copyEmailToClipboard();
            }}
            tabIndex={0}
            className={`flex items-center justify-center h-6 w-6 rounded ${
              copied ? 'bg-green-400' : 'bg-gray-200'
            } transition-all duration-300`}
          >
            <span className="material-symbols-rounded text-xs text-gray-600 cursor-">
              {copied ? 'done' : 'content_copy'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
