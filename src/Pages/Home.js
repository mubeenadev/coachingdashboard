import React, { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../components/Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Box, Button } from "@chakra-ui/react";

function Home() {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("");
    const navigate = useNavigate();
    const fetchUserName = useCallback(async () => {
        try {
            const q = query(
                collection(db, "users"),
                where("uid", "==", user?.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            setUserType(data.userType);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }, [user]);
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        else {
            userType === "coach"
                ? navigate(`/coach/${user.uid}`)
                : navigate(`/coachee/${user.uid}`);
        }
        fetchUserName();
    }, [user, loading, fetchUserName, navigate]);
    return (
        <Box>
            <Box>
                Logged in as
                <Box>{name}</Box>
                <Box>{user?.email}</Box>
                <Button
                    onClick={() => {
                        logout();
                        setName("");
                    }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
}
export default Home;
