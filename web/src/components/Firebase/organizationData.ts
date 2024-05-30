import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { meetingCollection, organizationCollection, taskColletion, teamCollection, userCollection } from "./databaseConfig";
import { db } from "./firebase";
import {OrgTeamStatsProps} from '@/types/interfaces/types';

export const getTeamInfo = async (organizationId: string) => {
    try {
        const organizationRef = doc(db, organizationCollection, organizationId);
        const organizationDoc = await getDoc(organizationRef);
        if(organizationDoc.exists()) {
            const organizationData = organizationDoc.data();
            const teams = organizationData.teams;
            let teamInfos: OrgTeamStatsProps[] = [];
            for (let i = 0; i < teams.length; i++) {
                const teamRef = teams[i];
                const teamDoc = await getDoc(teamRef);
                if (teamDoc.exists()) {
                    const teamData: any = teamDoc.data(); // Explicitly type 'teamData' as 'any'
                    
                    // create a new object with the required data
                    const teamInfo = {
                        teamName: teamData.name,
                        meetingTime: 100,
                        meetingPercentage: 90,
                        decisions: teamData.decisions,
                        severity: teamData.positiveScore/100,
                    };
                    console.log("Team data:", teamInfo);
                    teamInfos.push(teamInfo);
                } else {
                    console.log("No such team document!");
                }
            }
            return teamInfos;
        } else {
            return [];
        }
    }
    catch (error) {
        console.error("Error fetching organization:", error);
        throw error;
    }
}

export const fetchOrgMeetings = async (organizationId: string) => {
    try {
        const organizationRef = doc(db, organizationCollection, organizationId);
        const organizationDoc = await getDoc(organizationRef);
        if(organizationDoc.exists()) {
            const organizationData = organizationDoc.data();
            const teams = organizationData.teams;
            const meetings: Meeting[] = [];
            for (let i = 0; i < teams.length; i++) {
                const teamRef = teams[i];
                const teamDoc = await getDoc(teamRef);
                if (teamDoc.exists()) {
                    const meetingRef = collection(db, meetingCollection);
                    const q = query(meetingRef, where("team", "==", teamRef));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        meetings.push(doc.data() as Meeting);
                    });
                }
            }
        }
        return meetings;
    }
    catch (error) {
        console.error("Error fetching meetings:", error);
        return [];
    }
};