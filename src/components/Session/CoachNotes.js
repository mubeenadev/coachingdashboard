import React from "react";
import CardContainer from "../Card/CardContainer";
import { VStack, Box } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";

const CoachNotes = ({ notes, setNotes }) => {
    return (
        <CardContainer title="Coach Notes">
            <VStack width="100%" padding={5} maxHeight={300} minH={300}>
                <Box
                    width="100%"
                    maxHeight="200px"
                    overflowY="auto"
                    marginBottom={4}
                >
                    <Textarea
                        value={notes}
                        onChange={(e) => {
                            setNotes(e.target.value);
                        }}
                    />
                </Box>
            </VStack>
        </CardContainer>
    );
};

export default CoachNotes;
