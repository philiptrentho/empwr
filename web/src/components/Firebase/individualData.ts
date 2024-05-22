import { DocumentReference, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { taskColletion, userCollection } from "./databaseConfig";
import { db } from "./firebase";
import { Task } from "@/types/interfaces/types";

export const fetchUserDetails = async (userId: string) => {
    try {
        const userRef = doc(db, userCollection, userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            console.log("User data:", userDoc.data());
            const userTasks = userDoc.data().tasks;
            const tasks = [];
            for(let i = 0; i < userTasks.length; i++) {
                const taskRef = userTasks[i];
                const taskDoc = await getDoc(taskRef);
                if (taskDoc.exists()) {
                    console.log("Task data:", taskDoc.data());
                    tasks.push(taskDoc.data());
                } else {
                    console.log("No such task document!");
                }
            }
            return tasks;
        } else {
        console.log("No such user document!");
        return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const fetchUserTasks = async (userId: string) => {
    try {
        const tasksRef = collection(db, taskColletion);
        const q = query(tasksRef, where("assignedTo", "array-contains", doc(db, userCollection, userId)));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        let tasks: Task[] = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tasks.push(doc.data() as Task);
        });
        return tasks;

    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};



