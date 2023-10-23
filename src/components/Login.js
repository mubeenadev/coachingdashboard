import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    auth,
    logInWithEmailAndPassword,
    signInWithGoogle,
} from "../Config/Firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    Button,
    Input,
    Box,
    Stack,
    Heading,
    Text,
    HStack,
    Image,
    Container,
    FormControl,
    FormLabel,
    Divider,
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "../Utils/OAuthButtonGroup.js";
import { PasswordField } from "../Utils/PasswordField.jsx";
import logo from "../Assets/png/logo-no-background.png";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/");
    }, [user, loading, navigate]);
    return (
        <Container
            maxW="lg"
            py={{
                base: "12",
                md: "24",
            }}
            px={{
                base: "0",
                sm: "8",
            }}
        >
            <Box m={10}>
                <Image src={logo} alt="Logo" />
            </Box>
            <Stack spacing="8">
                <Stack spacing="6">
                    <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                        <Heading size={{ base: "xs", md: "sm" }}>
                            Log in to your account
                        </Heading>
                        <Text color="fg.muted">
                            Don't have an account?
                            <Link to="/signup"> SignUp </Link>
                        </Text>
                    </Stack>
                </Stack>
                <Box
                    py={{ base: "0", sm: "8" }}
                    px={{ base: "4", sm: "10" }}
                    bg={{ base: "transparent", sm: "bg.surface" }}
                    boxShadow={{ base: "none", sm: "md" }}
                    borderRadius={{ base: "none", sm: "xl" }}
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <PasswordField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Stack>

                        <Stack spacing="6">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    logInWithEmailAndPassword(email, password);
                                }}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}

export default Login;
