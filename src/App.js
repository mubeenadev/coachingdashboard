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
import Session from "./Pages/Session";
import NavBar from "./components/NavBar";
import AuthHandler from "./Pages/AuthHandler";
import Profile from "./Pages/Profile";
import { useAuthUserData } from "./Hooks/useAuthUserData";

function App() {
    const { user, userData, loading } = useAuthUserData();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                        userType={userData.userType}
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
                        element={<Profile userData={userData} user={user} />}
                    />
                    <Route exact path="session/:id" element={<Session />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
