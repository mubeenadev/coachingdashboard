import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Checkbox,
    VStack,
    Stack,
    HStack,
    Text,
    Flex,
} from "@chakra-ui/react";
import { useDebounce } from "usehooks-ts";
import { Editor } from "@tinymce/tinymce-react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import ActionCard from "./ActionCard";
import ResourceCard from "./ResourceCard";

const SETTINGS = [
    {
        title: "Data enabled",
        subtitle: "Access over Mobile network",
        isChecked: false,
    },
    {
        title: "Data roaming",
        subtitle: "Connect to data services",
    },
    {
        title: "Enable always-on mobile data",
        subtitle: "Use more power on dome mobile networks",
    },
    {
        title: "Use only 6G networks",
        subtitle: "Saves battery",
        isChecked: true,
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
                    <ResourceCard></ResourceCard>
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
                    boxShadow="0px 8px 16px rgba(58, 58, 68, 0.12), 0px 16px 32px rgba(90, 91, 106, 0.12);"
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
