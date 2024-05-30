import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Team } from '../../types/interfaces/types';
import { db } from '../Firebase/firebase'; // Ensure you have the correct path for firebase config
import { doc, updateDoc, arrayRemove , arrayUnion} from 'firebase/firestore';

interface TeamEntryProps {
  team: Team;
  typeData: string;
  index: number;
  userID: string;
  refreshTeams: () => Promise<void>;

}

const formatLastUpdated = (timeString: string): string => {
  const lastUpdatedDate = new Date(timeString);
  if (isNaN(lastUpdatedDate.getTime())) {
    throw new Error(`Invalid date format for LastUpdated: ${timeString}`);
  }

  return lastUpdatedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
};

const TeamEntry: React.FC<TeamEntryProps> = ({ team, typeData, index, userID, refreshTeams }) => {
const navigate = useNavigate();

const handleUnfollow = async () => {
    const teamRef = doc(db, 'updated_teams', team.teamID);
    const userRef = doc(db, 'updated_users', userID); // Creates a document reference for the user

    console.log(userRef.path); // This should log the correct path to ensure it matches what is stored in Firestore

    try {
        await updateDoc(teamRef, {
            followers: arrayRemove(userRef) // Use the document reference here
        });
        refreshTeams()
        console.log("User removed from followers.");
        // fetchTeams(); // Uncomment this to refresh data once you confirm the function works
    } catch (error) {
        console.error('Error updating team followers:', error);
    }
};

const handleJoin = async () => {
    const teamRef = doc(db, 'updated_teams', team.teamID);
    const userRef = doc(db, 'updated_users', userID);

    try {
      await updateDoc(teamRef, {
        followers: arrayUnion(userRef)
      });
      refreshTeams()
      console.log("User added to followers.");
    } catch (error) {
      console.error('Error adding to team followers:', error);
    }
  };

  const acceptInvitation = async () => {
    const teamRef = doc(db, 'updated_teams', team.teamID);
    const userRef = doc(db, 'updated_users', userID);

    try {
      await updateDoc(teamRef, {
        invitedParticipants: arrayRemove(userRef),
        followers: arrayUnion(userRef)
      });
      refreshTeams()
      console.log("Invitation accepted and user added to followers.");
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };

  const declineInvitation = async () => {
    const teamRef = doc(db, 'updated_teams', team.teamID);
    const userRef = doc(db, 'updated_users', userID);

    try {
      await updateDoc(teamRef, {
        invitedParticipants: arrayRemove(userRef)
      });
      refreshTeams()
      console.log("Invitation declined and user removed from invited participants.");
    } catch (error) {
      console.error('Error declining invitation:', error);
    }
  };


  return (
    <div
      key={index}
      className="flex flex-row space-x-4 bg-white rounded p-4 mb-4"
      onClick={() => {
        console.log(team.teamID);
        navigate(`/DetailedTeamView/${team.teamID}`);
      }}
    >
      <h2 className="font-bold text-lg mb-2 w-1/5">{team.name}</h2>
      <p className="w-1/5">{team.Permissions}</p>
      <p className="w-1/5">{team.followers.length}</p>
      <p className="w-1/5">Last Update: {formatLastUpdated(team.LastUpdated)}</p>
      <div className="w-24">
        {typeData === 'Following' && (
          <button
            className={`h-12 py-2 px-4 rounded-full w-full text-center ${team.follow ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}`}
            onClick={(e) => {
              e.stopPropagation();
              if (team.follow) {
                handleUnfollow();
              } else {
                // Add follow logic here if needed
              }
            }}
          >
            {team.follow ? 'Unfollow' : 'Follow'}
          </button>
        )}
        {typeData === 'Explore' && (
          <button
            className="h-12 py-2 px-4 rounded-full w-full text-center bg-green-500 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleJoin()
              // Placeholder for join team logic
            }}
          >
            Join
          </button>
        )}
        {typeData === 'Invitations' && (
          <div className="flex space-x-4">
            <button
              className="h-10 py-1 px-3 rounded-full w-1/2 text-center bg-green-500 text-white"
              onClick={(e) => {
                e.stopPropagation();
                acceptInvitation();
                // Placeholder for accept invitation logic
              }}
            >
              &#10003;
            </button>
            <button
              className="h-10 py-1 px-3 rounded-full w-1/2 text-center bg-red-500 text-white"
              onClick={(e) => {
                e.stopPropagation();
                declineInvitation();
                // Placeholder for decline invitation logic
              }}
            >
              &#10007;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamEntry;
