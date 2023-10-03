import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../Config/Firebase";
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Button,
    Stack,
    Container,
    Heading,
    Text,
    HStack,
    Link,
} from "@chakra-ui/react";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
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
            <Stack spacing="8">
                <Stack spacing="6">
                    <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                        <Heading size={{ base: "xs", md: "sm" }}>
                            Reset Email
                        </Heading>
                        <Text color="fg.muted">
                            Don't have an account?
                            <Link to="/signup">SignUp</Link>
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
                        </Stack>
                        <Stack spacing="6">
                            <Button
                                onClick={(e) => {
                                    // e.preventDefault();
                                    sendPasswordReset(email);
                                }}
                            >
                                Send password reset email
                            </Button>
                        </Stack>
                        <HStack>
                            <Stack>
                                <Box>
                                    Don't have an account?
                                    <Link to="/signup">Register</Link> now.
                                </Box>
                            </Stack>
                        </HStack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}
export default ResetPassword;
