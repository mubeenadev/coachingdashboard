import { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Config/Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export function useAuthUserData() {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState({
        userType: "",
        userName: "",
    });

    const fetchUserData = useCallback(async () => {
        try {
            if (!user) {
                return;
            }

            const q = query(
                collection(db, "users"),
                where("uid", "==", user?.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setUserData({
                userType: data.userType,
                userName: data.name,
            });
        } catch (err) {
            console.error(err);
            alert("An error occurred while fetching user data");
        }
    }, [user]);

    useEffect(() => {
        if (loading) return;
        fetchUserData();
    }, [user, loading, fetchUserData]);

    return { user, userData, loading };
}
