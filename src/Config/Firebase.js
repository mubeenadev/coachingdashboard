// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    doc,
    where,
    addDoc,
    setDoc,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFKdmULC-aOS1FRXTZbsqoag7jctcCOK4",
    authDomain: "coachconnect-400506.firebaseapp.com",
    databaseURL: "https://coachconnect-400506-default-rtdb.firebaseio.com",
    projectId: "coachconnect-400506",
    storageBucket: "coachconnect-400506.appspot.com",
    messagingSenderId: "646593846571",
    appId: "1:646593846571:web:16f0bcc8185d338486796e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Remove if not using Google Auth
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    console.log("here");
    try {
        googleProvider.addScope(
            "https://www.googleapis.com/auth/calendar.readonly"
        );
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;

        // await window.gapi.client.init({
        //     apiKey: firebaseConfig.apiKey,
        //     clientId:
        //         "893730550227-0fi6ei52m5ku35jpago9thn2ed1936c8.apps.googleusercontent.com",
        //     scope: "https://www.googleapis.com/auth/calendar.readonly",
        // });

        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (
    name,
    email,
    password,
    userType
) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            authProvider: "local",
            userType,
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    console.log("here : ", email);
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = async () => {
    return signOut(auth);
};

export {
    auth,
    db,
    storage,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};
