import React, { useState, useRef, useEffect } from "react";
import { Box, VStack, HStack, Text, Link, Button } from "@chakra-ui/react";
import { useDebounce } from "usehooks-ts";
import { Editor } from "@tinymce/tinymce-react";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { useParams } from "react-router-dom";
import ActionCard from "../components/Card/Action/ActionCard";
import ResourceCard from "../components/Card/Resource/ResourceCard";
import CoachNotes from "../components/Session/CoachNotes";
import {
    getFirestore,
    getDoc,
    setDoc,
    collection,
    doc,
} from "firebase/firestore";
import useDidMountEffect from "../Hooks/useDidMountEffect";
import { useAuthUserData } from "../Hooks/useAuthUserData";

function Session() {
    const [notes, setNotes] = useState("");
    const [coachNotes, setCoachNotes] = useState("");
    const [action, setActions] = useState([]);
    const [resource, setResource] = useState([]);
    const [sessionDetail, setSessionDetail] = useState();
    const [fireStoreSessionDetail, setFirestoreSessionDetail] = useState();
    const debouncedNotes = useDebounce(notes, 500);
    const editorRef = useRef(null);
    const db = getDatabase();
    const firestore = getFirestore();
    const { id } = useParams();
    const isInitialMount = useRef(true);
    const { userData } = useAuthUserData();

    const actionRef = ref(db, "session/" + id + "/actionItems");
    const noteRef = ref(db, "session/" + id + "/notes");
    const sessionRef = ref(db, "session/" + id);
    const resourceRef = ref(db, "resources/");

    useEffect(() => {
        get(sessionRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setSessionDetail(snapshot.val());
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });

        onValue(noteRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data !== notes) {
                setNotes(data);
            }
        });
        onValue(actionRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data !== action) {
                setActions(data);
            }
        });
        onValue(resourceRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data !== resource) {
                setResource(data);
            }
        });

        getDoc(doc(firestore, "session", id)).then((doc) => {
            if (doc.exists) {
                setFirestoreSessionDetail(doc.data());
                setCoachNotes(doc.data().coachNotes);
            }
        });
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            set(actionRef, action);
        }
    }, [action]);

    useEffect(() => {
        if (debouncedNotes && debouncedNotes !== "") {
            set(noteRef, debouncedNotes);
        }
    }, [debouncedNotes]);

    useDidMountEffect(() => {
        if (coachNotes)
            setDoc(
                doc(firestore, "session", id),
                { coachNotes },
                { merge: true }
            );
    }, [coachNotes]);

    const handleChange = (newAction) => {
        setActions(newAction);
    };
    console.log(userData);

    return (
        <Box margin={8}>
            {sessionDetail && (
                <>
                    <HStack spacing={5} mb={5}>
                        <Text fontSize="2xl" fontWeight={700}>
                            {sessionDetail.name}
                        </Text>
                        <Button colorScheme="teal">
                            <Link href={sessionDetail.meetLink} isExternal>
                                Google Meet
                            </Link>
                        </Button>
                    </HStack>

                    <HStack
                        spacing={8}
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <VStack spacing={8} flex={1}>
                            <ActionCard
                                data={action}
                                title="Action Items"
                                onChange={handleChange}
                            />
                            <ResourceCard data={resource}></ResourceCard>
                            {userData && userData.userType === "coach" && (
                                <CoachNotes
                                    notes={coachNotes}
                                    setNotes={(v) => setCoachNotes(v)}
                                />
                            )}
                        </VStack>
                        <Box
                            spacing={2}
                            ml={0}
                            justifyContent="center"
                            alignItems="center"
                            bg="white"
                            flex={1}
                            minH={700}
                            maxH={700}
                            borderRadius={24}
                            borderColor="#CBD5E0"
                        >
                            <div style={{ width: "100%", height: "100%" }}>
                                <Editor
                                    onInit={(evt, editor) =>
                                        (editorRef.current = editor)
                                    }
                                    value={notes}
                                    onEditorChange={(newValue) => {
                                        setNotes(newValue);
                                    }}
                                    init={{
                                        height: 670,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "preview",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "code",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                            "code",
                                            "help",
                                            "wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | blocks | " +
                                            "bold italic forecolor | alignleft aligncenter " +
                                            "alignright alignjustify | bullist numlist outdent indent | " +
                                            "removeformat | help",
                                        content_style:
                                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    }}
                                />
                            </div>
                        </Box>
                    </HStack>
                </>
            )}
        </Box>
    );
}

export default Session;
