import React from "react";
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

function App() {
    return (
        <ChakraProvider theme={theme}>
            <NavBar>
                <Router>
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
            </NavBar>
        </ChakraProvider>
    );
}

export default App;
