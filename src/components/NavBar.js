import React, { useState } from "react";
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,
    Center,
    Spinner,
    Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { logout } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/png/logo-no-background.png";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = (props) => {
    const { children } = props;

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
            }}
            href={"#"}
        >
            {children}
        </Box>
    );
};

export default function NavBar(props) {
    const { isLoggedIn } = props;
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate(); // Hook to perform navigation

    const handleLogout = async () => {
        await logout(); // Logout function from Firebase
        console.log("here in navbar");
        navigate("/"); // Navigate back to the home page
    };

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <IconButton
                        size={"md"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={"center"}>
                        <Box>
                            <Image
                                src={logo}
                                alt="Logo"
                                height={5}
                                onClick={() => navigate("/")}
                            />
                        </Box>
                        <HStack
                            as={"nav"}
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        ></HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        {isLoggedIn ? (
                            <Button
                                variant={"solid"}
                                colorScheme={"teal"}
                                size={"sm"}
                                mr={4}
                                onClick={handleLogout}
                            >
                                Signout
                            </Button>
                        ) : (
                            <Center>
                                {loading ? (
                                    <Spinner size="sm" />
                                ) : (
                                    <NavLink href="/login">Login</NavLink>
                                )}
                            </Center>
                        )}
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
