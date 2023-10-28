import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { query, where, getDocs, collection } from "firebase/firestore";
import { useAuthUserData } from "../../Hooks/useAuthUserData";
import { db } from "../../Config/Firebase";
import { useNavigate, useParams } from "react-router-dom";

const SessionCards = () => {
    const [sessions, setSessions] = useState([]);
    const { user, userData, loading } = useAuthUserData();
    const navigate = useNavigate();
    const { id: profileId } = useParams();
    useEffect(() => {
        if (!loading) {
            getDocs(
                userData.userType === "coach"
                    ? query(
                          collection(db, "session"),
                          where("coacheeId", "==", profileId),
                          where("coachId", "==", user.uid)
                      )
                    : query(
                          collection(db, "session"),
                          where("coacheeId", "==", profileId)
                      )
            )
                .then((snapshot) => {
                    if (snapshot.docs.length) {
                        setSessions(snapshot.docs.map((d) => d.data()));
                    } else {
                        throw Error("No session");
                    }
                })
                .catch((e) => console.log(e.message));
        }
    }, [loading]);

    return (
        <>
            <Flex flexWrap="wrap">
                {sessions.map((card, index) => (
                    <Box
                        key={index}
                        margin="1rem"
                        padding="1rem"
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        onClick={() => {
                            navigate(`/session/${card.id}`);
                        }}
                    >
                        <Text>
                            {new Date(card.start.dateTime).toLocaleString()}
                        </Text>
                    </Box>
                ))}
            </Flex>
        </>
    );
};

export default SessionCards;
