import React, { useState } from "react";
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
    FormLabel,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";
import FileUploader from "../../../Utils/FileUploader";

const ResourceModal = ({ isOpen, onClose, onSave }) => {
    const initialRef = React.useRef();
    const finalRef = React.useRef();

    const [resourceTitle, setResourceTitle] = useState("");
    const [resourceCategory, setResourceCategory] = useState("");
    const [resourceURL, setResourceURL] = useState("");
    const [upload, setUpload] = useState(false);
    const [isError, setIsError] = useState(false);

    const updateDownloadURL = (url) => {
        if (url) {
            setResourceURL(url);
            setUpload(true);
        }
    };

    const handleSave = () => {
        if (
            resourceTitle !== "" &&
            resourceURL !== "" &&
            resourceCategory !== ""
        ) {
            console.log("inside oif");
            if (upload) {
                onSave({
                    title: resourceTitle,
                    link: resourceURL,
                    category: resourceCategory,
                });
                setResourceURL("");
                setResourceTitle("");
                setResourceCategory("");
                onClose();
            }
        } else {
            // Set an error message to be displayed
            console.log("errekmj");
            setIsError(true);
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
                <ModalHeader>Add New Resource</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isInvalid={isError}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            ref={initialRef}
                            placeholder="Title"
                            value={resourceTitle}
                            onChange={(e) => setResourceTitle(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Category</FormLabel>
                        <Select
                            placeholder="Select category"
                            value={resourceCategory}
                            onChange={(e) =>
                                setResourceCategory(e.target.value)
                            }
                        >
                            <option value="resume">Resume</option>
                            <option value="coverletter">Cover Letter</option>
                            <option value="others">Others</option>
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>File</FormLabel>
                        <FileUploader onSuccess={updateDownloadURL} />
                    </FormControl>
                    <FormControl mt={4}>
                        {isError && <Text mt={2}>All fields are required</Text>}
                    </FormControl>
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

export default ResourceModal;
