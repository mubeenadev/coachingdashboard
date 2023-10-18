import React, { useState, useRef, useEffect } from "react";
import { storage } from "../Config/Firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    Button,
    HStack,
    Input,
    Text,
    Box,
    CircularProgress,
    InputGroup,
    InputLeftElement,
    Icon,
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";
import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDatabase, set, ref as dataRef, onValue } from "firebase/database";

function FileUpload() {
    // State to store selected file
    const [file, setFile] = useState(null);
    const [user, loading] = useAuthState(auth);
    const [document, setDocument] = useState({});
    const db = getDatabase();
    const documentRef = dataRef(db, "userdocuments/");
    const fileInputRef = useRef(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            set(documentRef, document);
        }
    }, [document]);

    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };

    // Progress state
    const [percent, setPercent] = useState(0);
    const [uploading, setUploading] = useState(false);

    // Handle file selection event and update state
    function handleChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // Create a task to upload the file
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen to upload progress
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percentUploaded = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percentUploaded);
            },
            (error) => {
                console.error("Error uploading file:", error);
                alert("Upload failed. Please try again.");
                setPercent(0);
                setUploading(false);
            },
            () => {
                // Upload completed, get the download URL
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        const newDocument = {
                            filename: file.name,
                            url: downloadURL,
                        };
                        setDocument((prevData) => ({
                            ...prevData,
                            [user.uid]: {
                                documents: [
                                    ...(prevData[user.uid]?.documents || []),
                                    newDocument,
                                ],
                            },
                        }));
                        console.log(
                            "File uploaded successfully. Download URL:",
                            downloadURL
                        );
                        alert("File uploaded successfully!");
                        setPercent(0);
                        setUploading(false);
                    })
                    .catch((error) => {
                        console.error("Error getting download URL:", error);
                        alert(
                            "Upload completed, but unable to get the download URL."
                        );
                        setPercent(0);
                        setUploading(false);
                    });
            }
        );

        setUploading(true);
    };

    return (
        <HStack
            flex="1"
            width="50%"
            justifyContent="center"
            alignItems="center"
            spacing={4}
        >
            <Input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
                accept=".pdf"
            />
            <InputGroup size="md" paddingLeft={4}>
                <Input
                    variant="filled"
                    borderRadius="md"
                    value={file?.name || ""}
                    placeholder="Choose a PDF file..."
                    _hover={{ borderColor: "teal.400" }}
                    _focus={{ borderColor: "teal.600", boxShadow: "none" }}
                    readOnly
                />
                <InputLeftElement>
                    <Button
                        onClick={handleCustomButtonClick}
                        colorScheme="teal"
                        size="md"
                    >
                        <Icon as={FaUpload} />
                    </Button>
                </InputLeftElement>
            </InputGroup>

            <Button
                colorScheme="teal"
                onClick={handleUpload}
                isDisabled={uploading}
                w={"50%"}
            >
                Upload to Firebase
            </Button>
            {/* <Box>
                {percent >= 0 && percent <= 100 ? (
                    <Text fontWeight="bold">{percent}% uploaded</Text>
                ) : (
                    <Text color="red.500">Invalid progress value</Text>
                )}
            </Box> */}
            {uploading && (
                <CircularProgress
                    value={percent}
                    size="100px"
                    thickness={10}
                    color="teal"
                />
            )}
        </HStack>
    );
}

export default FileUpload;
