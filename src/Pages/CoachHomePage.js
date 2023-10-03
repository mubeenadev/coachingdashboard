import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    Stack,
    VStack,
    HStack,
    Center,
    Text,
} from "@chakra-ui/react";
import Calendar from "@ericz1803/react-google-calendar";
import { css } from "@emotion/react";
import ResourceCard from "../components/Card/Resource/ResourceCard";
import CardContainer from "../components/Card/CardContainer";
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

const resourcesData = [
    {
        title: "Secret of success",
        category: "presentation",
        link: "#",
    },
    {
        title: "Avoid mistakes in cv",
        category: "coverletter",
        link: " ",
    },
    {
        title: "Better talk April, 05, 2020",
        category: "communication",
        link: "#",
    },
    {
        title: "June, 25, 2019",
        category: "#QW-103578",
        link: "#",
    },
];

const CoachHomePage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        category: "",
    });

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSaveData = (formData) => {
        setFormData(formData);

        resourcesData.push(formData);
        console.log("newdata", formData);
    };

    return (
        <Box m={8}>
            <HStack mt={8} spacing={8} alignItems="baseline">
                <Stack flex="2">
                    <Calendar
                        apiKey={process.env.REACT_APP_CALENDAR_API_KEY}
                        calendars={calendars}
                        styles={styles}
                    />
                </Stack>

                <VStack flex="1" spacing={8}>
                    <ClientCard></ClientCard>

                    <ResourceCard data={resourcesData}>
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
