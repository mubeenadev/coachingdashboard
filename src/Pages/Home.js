import React, { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../Config/Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Box, Button } from "@chakra-ui/react";

function Home() {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("");
    const navigate = useNavigate();

    const fetchUserData = useCallback(async () => {
        try {
            if (!user) {
                navigate("/login");
                return;
            }

            const q = query(
                collection(db, "users"),
                where("uid", "==", user?.uid)
            );
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            setUserType(data.userType);

            console.log("user is ", user);
            // Redirect based on user role
            if (data.userType === "coach") {
                navigate(`/coach/${user.uid}`);
            } else if (data.userType === "coachee") {
                navigate(`/coachee/${user.uid}`);
            } else {
                // Handle unknown user types here
                console.error("Unknown user type:", data.userType);
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while fetching user data");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (loading) return;
        fetchUserData();
    }, [user, loading, fetchUserData]);

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
