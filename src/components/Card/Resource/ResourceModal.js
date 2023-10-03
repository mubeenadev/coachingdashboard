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
} from "@chakra-ui/react";

const ResourceModal = ({ isOpen, onClose, onSave }) => {
    const initialRef = React.useRef();
    const finalRef = React.useRef();

    const [resourceTitle, setResourceTitle] = useState("");
    const [resourceCategory, setResourceCategory] = useState("");
    const [link, setLink] = useState("");

    const handleSave = () => {
        onSave({
            title: resourceTitle,
            link,
            category: resourceCategory,
        });
        onClose();
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
                    <FormControl>
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
                        <FormLabel>Link</FormLabel>
                        <Input
                            placeholder="Link to the resource"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
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
