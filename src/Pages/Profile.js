import React, { useEffect, useState } from "react";
import FileUpload from "../Utils/FileUpload";
import { Box, Text, Button, Stack, VStack } from "@chakra-ui/react";
import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserDocumentList } from "../Utils/userDocument";

function Profile() {
    const [user, loading] = useAuthState(auth);
    const [documents, setDocuments] = useState([]);

    const getDocs = async () => {
        if (user) {
            const data = await getUserDocumentList(user);
            setDocuments(data);
        }
    };

    useEffect(() => {
        getDocs();
    }, [user]);

    return (
        <Box>
            <Stack flex="1" width="100%" bg="white" p={3} gap={5}>
                <Text
                    fontSize="2xl"
                    fontWeight={700}
                    lineHeight="150%"
                    w="100%"
                >
                    {"My Profile"}
                </Text>
                <FileUpload></FileUpload>
                <VStack align="stretch" spacing={4}>
                    {documents &&
                        documents.map((document, index) => (
                            <Box
                                key={index}
                                bg="white"
                                p={3}
                                borderRadius={20}
                                borderWidth="2px"
                                borderColor="#CBD5E0"
                            >
                                <Stack
                                    direction={{ base: "column", md: "row" }}
                                    justifyContent={"space-between"}
                                    alignItems="center"
                                >
                                    <Text fontSize="xl" fontWeight="bold">
                                        {document.filename}
                                    </Text>
                                    <Button
                                        as="a"
                                        href={document.url}
                                        target="_blank"
                                        colorScheme="teal"
                                        size="md"
                                    >
                                        Open
                                    </Button>
                                </Stack>
                            </Box>
                        ))}
                </VStack>
            </Stack>
        </Box>
    );
}

export default Profile;
