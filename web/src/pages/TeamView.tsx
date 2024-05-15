import { fetchAllActions, fetchAllMeetings, fetchMeetings, fetchUser } from '../components/Firebase/firebase';
import { Meeting } from '../types/interfaces/types';
import React, { useEffect, useState } from 'react';
import './TeamView.css';
export default function TeamView() {
  const [meetingsData, setMeetingsData] = useState<Meeting[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMeetingsData = await fetchMeetings('tVI8NE9pLOyJyQ8jVpm2');
        setMeetingsData(fetchedMeetingsData);
      } catch (error) {
        console.error('Error handling:', error);
      }
    };

    fetchData();
  }, []);

  const filteredMeetings = meetingsData.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-sans font-bold text-3xl mb-20">Teams</h1>
      <div className="font-sans text-2xl flex flex-row space-x-4">
        <div>Following </div>
        <div>Explore </div>
        <div>Invitation </div>
      </div>
      <input
        type="text"
        placeholder="Search meetings..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
      />
      <div className="flex-grow">
        <div>
          <h2 className="font-bold text-lg mb-2">Meetings Before Today</h2>
          <div className="max-h-96 overflow-y-auto border border-gray-300 bg-gray-100 p-4 rounded w-82 scrollbar-hide mr-4 hide-scrollbar">
            {filteredMeetings.length > 0 ? (
              filteredMeetings.filter(meeting => new Date(meeting.start) >= new Date()).map((meeting, index) => (
                <div key={index} className="bg-white rounded p-4 mb-4">
                  <h2 className="font-bold text-lg mb-2">{meeting.title}</h2>
                  <p><strong>Start:</strong> {new Date(meeting.start).toLocaleString()}</p>
                  <p><strong>End:</strong> {new Date(meeting.end).toLocaleString()}</p>
                </div>
              ))) : (
              <p>No meetings found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
