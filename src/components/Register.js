import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../Config/Firebase.js";

import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    Radio,
    RadioGroup,
    Image,
} from "@chakra-ui/react";
import { PasswordField } from "../Utils/PasswordField.jsx";
import logo from "../Assets/png/logo-no-background.png";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("coach");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        if (!name) alert("Please enter name");
        console.log("here");
        registerWithEmailAndPassword(name, email, password, userType);
    };
    useEffect(() => {
        if (loading) return;

        if (user) {
            console.log("user: ", user);
            userType == "coach"
                ? navigate(`/coach/${user.uid}`)
                : navigate(`/coachee/${user.uid}`);
        }
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
                            Create an account
                        </Heading>
                        <Text color="fg.muted">
                            Have an account?
                            <Link to="/login"> Login </Link>
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
                            <FormControl>
                                <FormLabel htmlFor="name">Full name</FormLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            <PasswordField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControl>
                                <FormLabel htmlFor="usertype">Type</FormLabel>
                                <RadioGroup
                                    onChange={setUserType}
                                    value={userType}
                                >
                                    <Stack direction="row">
                                        <Radio value="coach">Coach</Radio>
                                        <Radio value="coachee">Coachee</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </Stack>

                        <Stack spacing="6">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log(userType);
                                    register();
                                }}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}
export default Register;
