// NOTE CLIENT DOES NOT USE FIREBASE, BUT THIS IS FOR TESTING/ GETTING SAMPLE USERS FROM FB FOR NOW
import { initializeApp } from 'firebase/app';
import { where,  QueryDocumentSnapshot, DocumentSnapshot, collection, getDocs, doc, getDoc, getFirestore, DocumentData } from 'firebase/firestore';
import { firestore } from 'firebase-admin';
import { Team, Users, Action, User, UserId, dummyType, Meeting } from '../../types/interfaces/types';
const firebaseConfig = {
    apiKey: 'AIzaSyBDKaHeRDyyZszMB89oV0BdXx1eOODIiHk',
    authDomain: 'tribe-b.firebaseapp.com',
    projectId: 'tribe-b',
    storageBucket: 'tribe-b.appspot.com',
    messagingSenderId: '202213317085',
    appId: '1:202213317085:web:17a62b698796c15d35fe34',
    measurementId: 'G-PNQQFEECEW',
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log('Firebase app:', firebaseApp);
// const db = {
//     users: firestore().collection('users')
//   }
// Get a Firestore instance

export const db = getFirestore(firebaseApp);
console.log('Firestore instance:', db);
// console.log('Firestore instance:', db);

// // Check if db has the 'collection' method
// if (typeof db.collection === 'function') {
//     console.log('db has the collection method');
// } else {
//     console.log('db does not have the collection method');
// }

// Example function using db
export const fetchUser = async (userId: string) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            console.log('User data:', userDoc.data());
            return userDoc.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};
export const fetchAllTeams = async (): Promise<Team[]> => {
    try {
        const teamsRef = collection(db, 'teams');
        const querySnapshot = await getDocs(teamsRef);

        const teamsArray: Team[] = [];
        querySnapshot.forEach((doc: DocumentSnapshot) => {
            const data = doc.data();
            if (data) { 
                const team: Team = {
                    follow: data.Follow,
                    followers: data.Followers,
                    LastUpdated: data.LastUpdated,
                    name: data.Name,
                    Permissions: data.Permissions
                };
            teamsArray.push(team);
            }
        });
        return teamsArray;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;
    }
};
export const fetchMeetings = async (userId: string) => {
    try {
        const meetingsRef = collection(db, 'meeting');
        const querySnapshot = await getDocs(meetingsRef);

        const meetingsArray: Meeting[] = [];

        for (const doc of querySnapshot.docs) {
            const data = doc.data() as DocumentData;
            const attendeeRefs: any[] = data.attendee;
            const attendeeSnapshots = await Promise.all(attendeeRefs.map((ref: any) => getDoc(ref)));
            const userIds = attendeeSnapshots.map(snapshot => snapshot.exists() ? snapshot.id : null);



            if (userIds.includes(userId)) {
                const meeting: Meeting = {
                    attendee: data.attendee,
                    end: data.end.toDate(),
                    eventId: data.eventId,
                    ownerId: data.ownerId,
                    start: data.start.toDate(),
                    title: data.title,
                };
                meetingsArray.push(meeting);
            }
        }

        return meetingsArray;
    } catch (error) {
        console.error('Error fetching meetings:', error);
        throw error;
    }
};
// TRY TO FIX BELOW


// export const fetchActions = async (userId: string) => {
//     try {
//         const actionsRef = collection(db, 'actions');
//         const querySnapshot = await getDocs(actionsRef);

//         const actionsArray: Action[] = [];

//         for (const doc of querySnapshot.docs) {
//             const data = doc.data() as DocumentData;
//             const actionItems: { action: string; name: string }[] = data.actionItems;
//             console.log("DEBUG");
//             console.log(actionItems[0].name);
//             console.log(`/users/${userId}`);
            
//             const matchingActionItems = await Promise.all(actionItems.map(async (item) => {
//                 const itemDocSnapshot = await getDoc(item.name);
//                 if (itemDocSnapshot.exists()) {
//                     return item;
//                 } else {
//                     return null;
//                 }
//             }));
//             const filteredActionItems = matchingActionItems.filter((item) => item !== null);
//             if (matchingActionItems.length > 0) {
//                 const meetingIdRef = data.meetingId as firestore.DocumentReference;
//                 const meetingId = meetingIdRef.id;

//                 const action: Action = {
//                     actionItems: matchingActionItems,
//                     meetingId: meetingId,
//                 };
//                 actionsArray.push(action);
//             }
//         }

//         return actionsArray;
//     } catch (error) {
//         console.error('Error fetching actions:', error);
//         throw error;
//     }
// };
export const fetchAllUsers = async () => {
    try {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);

        const usersArray: Users[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const users: Users = {
                name: data.name,
                id: doc.id,
            };
            usersArray.push(users);
        });
        return usersArray;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const fetchAllMeetings = async () => {
    try {
        const meetingsRef = collection(db, 'meeting');
        const querySnapshot = await getDocs(meetingsRef);

        const meetingsArray: Meeting[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const meeting: Meeting = {
                attendee: data.attendee,
                end: data.end.toDate(),
                eventId: data.eventId,
                ownerId: data.ownerId,
                start: data.start.toDate(),
                title: data.title,
            };
            meetingsArray.push(meeting);
        });
        return meetingsArray;
    } catch (error) {
        console.error('Error fetching meetings:', error);
        throw error;
    }
};
export const fetchAllActions = async () => {
    try {
        const actionsRef = collection(db, 'actions');
        const querySnapshot = await getDocs(actionsRef);

        const actionsArray: Action[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data(); // Extract data from DocumentSnapshot
            const actionItems: { action: string; name: string }[] = data.actionItems;
            const action: Action = {
                actionItems: actionItems,
                meetingId: data.meetingId,
            };
            actionsArray.push(action);
        });
        return actionsArray;
    } catch (error) {
        console.error('Error fetching actions:', error);
        throw error;
    }
};