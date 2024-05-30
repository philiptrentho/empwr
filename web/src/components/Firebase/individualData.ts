import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { Meeting, Task, User } from '@/types/interfaces/types';

import { meetingCollection, taskColletion, userCollection } from './databaseConfig';
import { db } from './firebase';

export const fetchUserDetails = async (userId: string) => {
  try {
    const userRef = doc(db, userCollection, userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      console.log('User data:', userDoc.data());
      const user = userDoc.data();
      return user as User;
    } else {
      console.log('No such user document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchUserTasks = async (userId: string) => {
  try {
    const tasksRef = collection(db, taskColletion);
    const q = query(
      tasksRef,
      where('assignedTo', 'array-contains', doc(db, userCollection, userId)),
    );
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    querySnapshot.forEach((doc) => {
      tasks.push(doc.data() as Task);
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchUserMeetings = async (userId: string) => {
  try {
    const meetingRef = collection(db, meetingCollection);
    const q = query(
      meetingRef,
      where('attendees', 'array-contains', doc(db, userCollection, userId)),
    );
    const querySnapshot = await getDocs(q);
    const tasks: Meeting[] = [];
    querySnapshot.forEach((doc) => {
      tasks.push(doc.data() as Meeting);
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw error;
  }
};
