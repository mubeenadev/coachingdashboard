import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    Link,
    Stack,
    VStack,
    HStack,
    Center,
    Text,
} from "@chakra-ui/react";
import Calendar from "@ericz1803/react-google-calendar";
import { css } from "@emotion/react";
import ResourceCard from "../components/Card/Resource/ResourceCard";
import { getDatabase, ref, set, onValue } from "firebase/database";
import ClientCard from "../components/Card/Client/ClientCard";
import ResourceModal from "../components/Card/Resource/ResourceModal";
let calendars = [
    {
        calendarId:
            "424f279cfa2fe07aa9bd4114fc2209a59cceb1f6c6a25c58e0a06e9771bc99ca@group.calendar.google.com",
    },
];

let styles = {
    calendar: {
        borderWidth: "2px",
        borderRadius: "20px",
        borderColor: "#CBD5E0",
        width: "100%", //make outer edge of calendar thicker
    },
    today: css`
        /* highlight today by making the text red and giving it a red border */
        color: red;
        border: 1px solid red;
    `,
};

const CoachHomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resources, setResources] = useState([]);

    const db = getDatabase();
    const resourcesRef = ref(db, "resources/");
    const isInitialMount = useRef(true);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        onValue(resourcesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const resourcesArray = Object.values(data);
                setResources(resourcesArray);
            }
        });
    }, []); //listener

    const handleSaveData = (resource) => {
        setResources((prevResources) => [...prevResources, resource]);
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Update the Firebase database with the new list of resources
            set(resourcesRef, resources);
        }
    }, [resources]);

    return (
        <Box m={8}>
            <HStack mt={8} spacing={8} alignItems="baseline">
                <Button>
                    <Link href="https://us-central1-coachconnect-400506.cloudfunctions.net/calendar-event-listener/auth/google">
                        <a className="w-full p-2">
                        Authorize Google Calendar
                        </a>
                    </Link>
                </Button>
                <Stack flex="2">
                    <Calendar
                        apiKey={process.env.REACT_APP_CALENDAR_API_KEY}
                        calendars={calendars}
                        styles={styles}
                    />
                </Stack>

                <VStack flex="1" spacing={8}>
                    <ClientCard></ClientCard>

                    <ResourceCard data={resources}>
                        <Button mt={4} onClick={handleModalOpen}>
                            Add New Resource
                        </Button>
                        <ResourceModal
                            isOpen={isModalOpen}
                            onClose={handleModalClose}
                            onSave={handleSaveData}
                        />
                    </ResourceCard>
                </VStack>
            </HStack>
        </Box>
    );
};

export default CoachHomePage;
