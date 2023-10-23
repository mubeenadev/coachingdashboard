import React, { useState, useEffect, useCallback } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
//import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ResetPassword from "./Pages/ResetPassword";
import CoachHomePage from "./Pages/CoachHomePage";
import CoacheeHomePage from "./Pages/CoacheeHomePage";
import Survey from "./Pages/Survey";
import Session from "./components/Session";
import NavBar from "./components/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./Config/Firebase";
import AuthHandler from "./Pages/AuthHandler";
import Profile from "./Pages/Profile";

import { query, collection, getDocs, where } from "firebase/firestore";

function App() {
    const [user, loading] = useAuthState(auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState("");

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
            setUserType(data.userType);
        } catch (err) {
            console.error(err);
            alert("An error occurred while fetching user data");
        }
    }, [user]);

    useEffect(() => {
        if (loading) return;
        fetchUserData();
    }, [user, loading, fetchUserData]);

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);
    return (
        <ChakraProvider theme={theme}>
            <Router>
                {isLoggedIn && (
                    <NavBar
                        isLoggedIn={isLoggedIn}
                        user={user}
                        userType={userType}
                    />
                )}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route
                        exact
                        path="/auth/google/callback"
                        element={<AuthHandler />}
                    />
                    <Route exact path="/signup" element={<SignUpPage />} />
                    <Route exact path="/survey" element={<Survey />} />
                    <Route
                        exact
                        path="/reset-password"
                        element={<ResetPassword />}
                    />
                    <Route
                        exact
                        path="/coach/:id"
                        element={<CoachHomePage />}
                    />
                    <Route
                        exact
                        path="/coachee/:id"
                        element={<CoacheeHomePage />}
                    />
                    <Route
                        exact
                        path="/coachee/:id/profile"
                        element={<Profile />}
                    />
                    <Route exact path="session/:id" element={<Session />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
