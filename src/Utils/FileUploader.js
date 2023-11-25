import React, { useState, useRef, useEffect } from "react";
import { storage } from "../Config/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    Button,
    HStack,
    Input,
    CircularProgress,
    InputGroup,
    InputLeftElement,
    Icon,
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

function FileUploader({ onSuccess }) {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const isInitialMount = useRef(true);

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

    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };

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
                        // Call the callback function with the download URL
                        onSuccess(downloadURL, file.name);

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

    useEffect(() => {
        if (!isInitialMount.current) {
            handleUpload();
        }
        isInitialMount.current = false;
    }, [file]);

    return (
        <HStack
            flex="1"
            width="100%"
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

            {uploading && (
                <CircularProgress
                    value={percent}
                    size="50px"
                    thickness={10}
                    color="teal"
                />
            )}
        </HStack>
    );
}

export default FileUploader;
