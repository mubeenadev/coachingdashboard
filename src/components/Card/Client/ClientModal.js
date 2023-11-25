import React, { useState, useEffect } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Spinner,
} from "@chakra-ui/react";
import { auth, db } from "../../../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
const ClientModal = ({ isOpen, onClose, onSave }) => {
    const initialRef = React.useRef();
    const finalRef = React.useRef();

    const [clientEmail, setClientEmail] = useState("");
    const [coachCategory, setCoachCategory] = useState("");
    const [user, loading] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const handleSave = async () => {
        setIsLoading(true);
        const clientId = await checkClientEmail();
        setIsLoading(false);

        if (clientId !== "") {
            onSave({
                clientId,
                coachCategory,
                coachId: user.uid, //coach user id
            });
        }
    };

    //check client email exist

    const checkClientEmail = async () => {
        const q = query(
            collection(db, "users"),
            where("email", "==", clientEmail),
            where("userType", "==", "coachee")
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            setIsError(true);
            return;
        } else {
            const doc = querySnapshot.docs[0].data();
            if (doc) {
                setIsError(false);
                onClose();
                return doc.uid;
            }
        }
    };

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Client</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {isLoading ? (
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    ) : (
                        <>
                            <FormControl isInvalid={isError}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="Title"
                                    value={clientEmail}
                                    onChange={(e) => {
                                        const email = e.target.value;
                                        setClientEmail(email);
                                        setIsError(false);
                                    }}
                                />
                                {isError && (
                                    <FormErrorMessage>
                                        User with email " {clientEmail} " does
                                        not exist
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    placeholder="Select Coach Category"
                                    value={coachCategory}
                                    onChange={(e) =>
                                        setCoachCategory(e.target.value)
                                    }
                                >
                                    <option value="AVGS">AVG</option>
                                    <option value="others">Others</option>
                                </Select>
                            </FormControl>
                        </>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ClientModal;
