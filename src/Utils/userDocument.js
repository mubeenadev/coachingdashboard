import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    getDatabase,
    set,
    ref as dataRef,
    onValue,
    child,
    get,
} from "firebase/database";

const db = getDatabase();
const documentRef = dataRef(db, "userdocuments/");

const getUserDocumentList = (user) => {
    return get(child(documentRef, `${user.uid}/documents`))
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

export { getUserDocumentList, addUserDocument };
