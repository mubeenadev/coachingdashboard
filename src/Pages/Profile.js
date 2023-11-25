import React, { useEffect, useState } from "react";
import FileUploader from "../Utils/FileUploader";
import { Box, Text, Button, Stack, VStack, HStack } from "@chakra-ui/react";
import {
    getProfileUserDetailsbyId,
    getUserDocumentList,
    addUserDocument,
} from "../Utils/userDocument";
import { useParams } from "react-router-dom";
import SessionCards from "../components/Profile/SessionCards";

function Profile({ userData, user }) {
    const { id } = useParams();
    const { userType } = userData;
    const [documents, setDocuments] = useState([]);
    const [userName, setUserName] = useState();
    const [loading, setLoading] = useState(true);

    const getDocuments = async () => {
        try {
            const data = await getUserDocumentList(id);
            setDocuments(data);
            const name = await getProfileUserDetailsbyId(id);
            setUserName(name);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDocuments();
    }, [id]);

    const storeFileData = (downloadURL, fileName) => {
        const newDocument = {
            filename: fileName,
            url: downloadURL,
        };
        addUserDocument(user, newDocument);
    };

    return (
        <Box>
            <Stack flex="1" width="100%" bg="white" p={3} gap={5}>
                <Text
                    fontSize="2xl"
                    fontWeight={700}
                    lineHeight="150%"
                    w="100%"
                >
                    {loading
                        ? "Loading..."
                        : userType === "coach"
                        ? `${userName}'s Profile`
                        : "My Profile"}
                </Text>
                {userType !== "coach" && (
                    <FileUploader onSuccess={storeFileData} />
                )}

                <VStack align="stretch" spacing={4}>
                    {documents.map((document, index) => (
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
                <VStack>
                    <Text
                        fontSize="2xl"
                        fontWeight={700}
                        lineHeight="150%"
                        w="100%"
                    >
                        Sessions
                    </Text>
                    <HStack>
                        <SessionCards />
                    </HStack>
                </VStack>
            </Stack>
        </Box>
    );
}

export default Profile;
