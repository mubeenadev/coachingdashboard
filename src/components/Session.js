import React, { useState, useRef, useEffect } from "react";
import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import { useDebounce } from "usehooks-ts";
import { Editor } from "@tinymce/tinymce-react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import ActionCard from "./Card/Action/ActionCard";
import ResourceCard from "./Card/Resource/ResourceCard";
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

function Session() {
    const [notes, setNotes] = useState("");
    const [action, setActions] = useState([]);
    const debouncedNotes = useDebounce(notes, 500);
    const editorRef = useRef(null);
    const db = getDatabase();
    const { id } = useParams();
    const isInitialMount = useRef(true);

    const actionRef = ref(db, "sessions/" + id + "/actionItems");
    const noteRef = ref(db, "sessions/" + id + "/notes");

    useEffect(() => {
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

    const handleChange = (newAction) => {
        setActions(newAction);
    };

    return (
        <Box padding={10}>
            <Text
                fontSize="2xl"
                fontWeight={700}
                lineHeight="150%"
                w="100%"
                mb={2}
            >
                Session Detail
            </Text>

            <HStack
                mt={10}
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <VStack spacing={10}>
                    <ActionCard
                        data={action}
                        title="Action Items"
                        onChange={handleChange}
                    />
                    <ResourceCard data={resourcesData}></ResourceCard>
                </VStack>
                <Box
                    spacing={2}
                    ml={10}
                    justifyContent="center"
                    alignItems="center"
                    bg="white"
                    flex={1}
                    p={3}
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
        </Box>
    );
}

export default Session;
