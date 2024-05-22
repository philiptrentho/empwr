import { doc, getDoc } from 'firebase/firestore';

import { db } from './firebase';

import { teamCollection } from './databaseConfig';
import { detailedTeam } from '@/types/interfaces/types';

export const fetchTeamDetails = async (teamId: string) => {
  try {
    const teamRef = doc(db, teamCollection, teamId);
    const teamDoc = await getDoc(teamRef);
    if (teamDoc.exists()) {
      const teammates = teamDoc.data().userStats;
      for (let i = 0; i < teammates.length; i++) {
        const teammate = teammates[i];
        const userRef = teammate.userId;
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          teammate.user = userDoc.data();
        } else {
          console.log('No such user document!');
        }
      }
      const teamData = teamDoc.data();
      teamData.userStats = teammates;
      console.log('teamData:', teamData as detailedTeam);
      return teamData as detailedTeam;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};
