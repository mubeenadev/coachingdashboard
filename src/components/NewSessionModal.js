import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter,
    Button,
    Stack,
    FormLabel,
    FormControl,
} from "@chakra-ui/react";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, setDoc, doc } from "firebase/firestore";

function NewSessionModal({
    isOpen,
    onClose,
    coachId,
    coacheeId,
    startTime,
    endTime,
}) {
    const firestore = getFirestore();
    const db = getDatabase();

    const onBookClick = async () => {
        const response = await fetch(
            "https://us-central1-coachconnect-400506.cloudfunctions.net/calendar-event-listener/add-session",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                referrerPolicy: "no-referrer",
                body: JSON.stringify({
                    startTime,
                    endTime,
                    coachId,
                    coacheeId,
                }),
            }
        );
        const event = await response.json();
        await setDoc(doc(firestore, "session", event.id), {
            id: event.id,
            name: event.summary,
            link: event.htmlLink,
            meetLink: event.hangoutLink,
            start: event.start,
            end: event.end,
            coachId,
            coacheeId,
        });

        set(ref(db, "session/" + event.id), {
            name: event.summary,
            link: event.htmlLink,
            meetLink: event.hangoutLink,
            start: event.start,
            end: event.end,
            coachId,
            coacheeId,
        });

        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Book Session</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <FormControl>
                                <FormLabel>Start Time</FormLabel>
                                <Input
                                    value={startTime && startTime.toISOString()}
                                    disabled
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>End Time</FormLabel>
                                <Input
                                    value={endTime && endTime.toISOString()}
                                    disabled
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue" onClick={onBookClick}>
                            Book
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default NewSessionModal;
