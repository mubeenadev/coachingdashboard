import React, { useState, useRef, useEffect } from "react";
import CardContainer from "../CardContainer";
import { VStack, Box } from "@chakra-ui/react";
import { Text, Flex, Spacer, Button, Link } from "@chakra-ui/react";
import ClientModal from "./ClientModal";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";
import { auth, db } from "../../../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ClientCard = () => {
    const [clientList, setClientList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, loading] = useAuthState(auth);

    //fetch the client list
    const Fetchdata = async () => {
        try {
            const coachId = user.uid;

            const querySnapshot = query(
                collection(db, "join-coach-coachee"),
                where("coachId", "==", coachId)
            );

            const doc = await getDocs(querySnapshot);
            let userList = [];
            doc.forEach((userDoc) => {
                userList.push(userDoc.data());
            });
            const userInfo = [];

            await Promise.all(
                userList.map(async (user) => {
                    const q = query(
                        collection(db, "users"),
                        where("uid", "==", user.clientId)
                    );
                    const docSnapshot = await getDocs(q);

                    if (!docSnapshot.empty) {
                        const userData = docSnapshot.docs[0].data();

                        userInfo.push({
                            name: userData.name,
                            type: user.coachCategory,
                            uid: userData.uid,
                            email: userData.email,
                        });
                    }
                })
            );
            setClientList(userInfo);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (!loading && user) {
            Fetchdata();
        }
    }, [loading, user]);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleSaveData = async (newClient) => {
        try {
            const docRef = await addDoc(
                collection(db, "join-coach-coachee"),
                newClient
            );
            Fetchdata();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <CardContainer title="Clients">
            <VStack width={"100%"} p={5} maxHeight={300}>
                <Box
                    style={{
                        flex: 1,
                        width: "100%",
                        height: "200px", // Set the maximum height for scrollability
                        overflowY: "auto", // Enable vertical scrolling
                    }}
                >
                    {clientList &&
                        clientList.map((row, index) => {
                            return (
                                <Flex
                                    key={index}
                                    width={"100%"}
                                    alignItems="center"
                                    marginBottom={15}
                                >
                                    <Flex direction="column">
                                        <Text
                                            fontSize="md"
                                            color={"gray.700"}
                                            fontWeight="semibold"
                                        >
                                            {row.name}
                                        </Text>
                                        <Text
                                            fontSize="sm"
                                            color="gray.400"
                                            fontWeight="semibold"
                                            me="16px"
                                        >
                                            {row.email}
                                        </Text>
                                    </Flex>
                                    <Spacer />
                                    <Link href="#" isExternal>
                                        <Button
                                            p="0px"
                                            bg="transparent"
                                            variant="no-hover"
                                        >
                                            <Flex alignItems="center" p="12px">
                                                <Text
                                                    fontSize="md"
                                                    color={"gray.700"}
                                                    fontWeight="bold"
                                                >
                                                    Open
                                                </Text>
                                            </Flex>
                                        </Button>
                                    </Link>
                                </Flex>
                            );
                        })}
                </Box>
                <Button onClick={handleModalOpen} p={2}>
                    Add New Client
                </Button>
                <ClientModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSave={handleSaveData}
                />
            </VStack>
        </CardContainer>
    );
};

export default ClientCard;
