import React, { useState, useRef, useEffect } from "react";
import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import { useDebounce } from "usehooks-ts";
import { Editor } from "@tinymce/tinymce-react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import ActionCard from "./Card/Action/ActionCard";
import ResourceCard from "./Card/Resource/ResourceCard";

function Session() {
    const [notes, setNotes] = useState("");
    const [action, setActions] = useState([]);
    const [resource, setResource] = useState([]);
    const debouncedNotes = useDebounce(notes, 500);
    const editorRef = useRef(null);
    const db = getDatabase();
    const { id } = useParams();
    const isInitialMount = useRef(true);

    const actionRef = ref(db, "sessions/" + id + "/actionItems");
    const noteRef = ref(db, "sessions/" + id + "/notes");
    const resourceRef = ref(db, "resources/");

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
        onValue(resourceRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data !== resource) {
                setResource(data);
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
        <Box margin={8}>
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
        </Box>
    );
}

export default Session;
