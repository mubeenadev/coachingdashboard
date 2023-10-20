import React, { useEffect, useState } from "react";
import FileUpload from "../Utils/FileUpload";
import { Box, Text, Button, Stack, VStack } from "@chakra-ui/react";
import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserDocumentList } from "../Utils/userDocument";

function CoacheeHomePage() {
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
            {/* <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2-xK80i9dvgDcmcWGV7rr6gjLWGhc14N5PWQPUzSxWd1WZxpfUrTSOlj9V2VtlguLG6UcAZ_8Q?gv=true"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
            ></iframe> */}
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

export default CoacheeHomePage;
