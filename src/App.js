import React, { useState, useEffect } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
//import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ResetPassword from "./Pages/ResetPassword";
import CoachHomePage from "./Pages/CoachHomePage";
import CoacheeHomePage from "./Pages/CoacheeHomePage";
import Session from "./components/Session";
import NavBar from "./components/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Config/Firebase";

function App() {
    const [user, loading] = useAuthState(auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);
    return (
        <ChakraProvider theme={theme}>
            <Router>
                {isLoggedIn && <NavBar isLoggedIn={isLoggedIn} />}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/signup" element={<SignUpPage />} />
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
                    <Route exact path="session/:id" element={<Session />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
