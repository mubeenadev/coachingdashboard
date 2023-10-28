import {
    getDatabase,
    set,
    ref as dataRef,
    child,
    get,
} from "firebase/database";
import { db as FirestoreDb } from "../Config/Firebase";

import { query, collection, getDocs, where } from "firebase/firestore";

//Access realtimeDb
const db = getDatabase();
const documentRef = dataRef(db, "userdocuments/");

const getUserDocumentList = (uid) => {
    return get(child(documentRef, `${uid}/documents`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                return snapshot.val();
            } else {
                return [];
            }
        })
        .catch((error) => {
            console.error(error);
            return [];
        });
};

const addUserDocument = async (user, newDocument) => {
    const userDocumentRef = child(documentRef, `${user.uid}/documents`);

    try {
        const snapshot = await get(userDocumentRef);
        let documentList = [];
        if (snapshot.exists()) {
            documentList = snapshot.val();
        }
        documentList.push(newDocument);
        await set(userDocumentRef, documentList);
        console.log("Document added successfully");
    } catch (error) {
        console.error("Error adding document:", error);
    }
};

const getProfileUserDetailsbyId = async (id) => {
    try {
        const usersCollection = collection(FirestoreDb, "users");
        const q = query(usersCollection, where("uid", "==", id));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        console.log(data);
        return data.name;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return;
    }
};

export { getUserDocumentList, addUserDocument, getProfileUserDetailsbyId };
