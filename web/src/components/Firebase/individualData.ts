import { initializeApp } from 'firebase/app';
import { Teammate } from '@/types/interfaces/types';
import { doc, getDoc } from 'firebase/firestore';

import { db } from './firebase';

import { teamCollection } from './databaseConfig';

export const fetchTeamMates = async (teamId: string) => {
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
      return teammates;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};
