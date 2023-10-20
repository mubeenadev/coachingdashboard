import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Link,
    Stack,
    VStack,
    HStack,
} from "@chakra-ui/react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import ResourceCard from "../components/Card/Resource/ResourceCard";
import { getDatabase, ref, set, onValue } from "firebase/database";
import ClientCard from "../components/Card/Client/ClientCard";
import ResourceModal from "../components/Card/Resource/ResourceModal";
import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import timeGridPlugin from '@fullcalendar/timegrid'

import {
    getFirestore,
    getDoc,
    doc,
} from "firebase/firestore";

const CoachHomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resources, setResources] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [hasCalendarConsent, setCalendarConsent] = useState(false)
    const [calendarEvents, setCalendarEvents] = useState([])
    const [calendarStart, setCalendarStart] = useState()
    const [calendarEnd, setCalendarEnd] = useState()

    const db = getDatabase();
    const firestore = getFirestore();

    const resourcesRef = ref(db, "resources/");
    const isInitialMount = useRef(true);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if(user) {
            const docRef = doc(firestore, "users", user.uid);
            getDoc(docRef).then(snapshot => {
                setCalendarConsent(!!snapshot.data().hasConsent)
            });
        }
    }, [user])

    useEffect(() => {
        if(hasCalendarConsent && calendarStart && calendarEnd) {
            fetch(`https://us-central1-coachconnect-400506.cloudfunctions.net/calendar-event-listener/calendar-events?userId=${user.uid}&start=${calendarStart}&end=${calendarEnd}`)
            .then(res => res.json())
            .then(res => {
                setCalendarEvents(res)
            })
        }
    }, [hasCalendarConsent, calendarStart, calendarEnd])

    useEffect(() => {
        onValue(resourcesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const resourcesArray = Object.values(data);
                setResources(resourcesArray);
            }
        });
    }, []);

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
                {hasCalendarConsent ? (<Stack flex="2">
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    datesSet={({ start, end }) => { 
                        setCalendarStart(start.toISOString())
                        setCalendarEnd(end.toISOString())
                    }}
                    events={
                        calendarEvents.map(event => ({
                            id: event.id,
                            title: event.summary,
                            start: event.start.dateTime,
                            end: event.end.dateTime,
                        }))
                    }
                />
                </Stack>) : (<Button>
                    <Link href="https://us-central1-coachconnect-400506.cloudfunctions.net/calendar-event-listener/auth/google">
                        Authorize Google Calendar
                    </Link>
                </Button>)}

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
