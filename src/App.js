import React from "react";
import { ChakraProvider, Flex, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ResetPassword from "./Pages/ResetPassword";
import Link from "./components/Link";

function App() {
    return (
        <ChakraProvider theme={theme}>
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
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
