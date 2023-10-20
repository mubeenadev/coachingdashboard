import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";

const NoteEditor = (props) => {
    const editorRef = useRef(null);
    return (
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
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={props.notes}
                    onEditorChange={(newValue) => {
                        props.setNotes(newValue);
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
    );
};

export default NoteEditor;
