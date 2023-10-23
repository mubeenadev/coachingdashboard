import React, { useEffect, useState } from "react";
import FileUpload from "../Utils/FileUpload";
import { Box, Text, Button, Stack, VStack } from "@chakra-ui/react";
import { auth, db, logout } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserDocumentList } from "../Utils/userDocument";
import { useParams } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";

function Profile({ userType }) {
    const { id } = useParams();
    const [documents, setDocuments] = useState([]);
    const [userName, setUserName] = useState();

    const getUserDetails = async () => {
        const q = query(collection(db, "users"), where("uid", "==", id));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setUserName(data.name);
    };

    const getDocuments = async () => {
        const data = await getUserDocumentList(id);
        setDocuments(data);
    };

    useEffect(() => {
        getDocuments();
        getUserDetails();
    }, [id]);

    return (
        <Box>
            <Stack flex="1" width="100%" bg="white" p={3} gap={5}>
                <Text
                    fontSize="2xl"
                    fontWeight={700}
                    lineHeight="150%"
                    w="100%"
                >
                    {userType === "coach"
                        ? `${userName}'s Profile`
                        : "My Profile"}
                </Text>
                {userType !== "coach" && <FileUpload></FileUpload>}

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
