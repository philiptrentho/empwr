import { doc, getDoc } from 'firebase/firestore';

import { detailedTeam } from '@/types/interfaces/types';

import { teamCollection } from './databaseConfig';
import { db } from './firebase';

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
      return teamData as detailedTeam;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};
