import React, { useState, useRef, useEffect } from "react";
import { smoothClasses } from "../../Styles/classes";
import {
    Checkbox,
    VStack,
    Stack,
    HStack,
    Text,
    Flex,
    Input,
    Button,
} from "@chakra-ui/react";
import CardContainer from "../CardContainer";

const ActionCard = (props) => {
    const [newItem, setNewItem] = useState({
        title: "",
        isChecked: false,
    });

    const scrollContainerRef = useRef(null);

    const handleAddItem = () => {
        if (newItem.title) {
            const newActionItems = [...props.data, newItem];
            props.onChange(newActionItems);
            props.data.push(newItem); // Add the new item to the data array
            setNewItem({ title: "", isChecked: false }); // Reset newItem state
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
                scrollContainerRef.current.scrollHeight;
        }
    }, [props.data]);

    const handleCheckbox = (index) => {
        const updatedSettings = [...props.data];
        updatedSettings[index].isChecked = !updatedSettings[index].isChecked;
        props.onChange(updatedSettings);
    };

    return (
        <CardContainer title={props.title}>
            <VStack>
                <div
                    style={{
                        width: "100%",
                        height: "200px", // Set the maximum height for scrollability
                        overflowY: "auto", // Enable vertical scrolling
                    }}
                    ref={scrollContainerRef}
                >
                    {props.data && props.data.length > 0 ? (
                        props.data.map((data, index) => (
                            <Checkbox
                                sx={smoothClasses}
                                spacing="18px"
                                key={data.title}
                                defaultChecked={data.isChecked}
                                onChange={() => handleCheckbox(index)}
                            >
                                <Flex alignItems="center">
                                    <Stack spacing={0}>
                                        <Text
                                            letterSpacing="0.0275em"
                                            fontWeight={400}
                                        >
                                            {data.title}
                                        </Text>
                                        <Text
                                            letterSpacing="0.018em"
                                            fontSize="sm"
                                            color="#5A5B6A"
                                        >
                                            {"date"}
                                        </Text>
                                    </Stack>
                                </Flex>
                            </Checkbox>
                        ))
                    ) : (
                        <p>Add Action Items</p>
                    )}
                </div>
                <HStack width="100%">
                    <Input
                        placeholder="New Action Item"
                        value={newItem.title}
                        onChange={(e) =>
                            setNewItem({ ...newItem, title: e.target.value })
                        }
                        size="md"
                        borderRadius="md"
                        borderColor="gray.200"
                        _focus={{
                            borderColor: "blue.400",
                        }}
                    />
                    <Button
                        onClick={handleAddItem}
                        size="md" // Adjust the size as needed
                        colorScheme="blue" // Use the blue color scheme
                        borderRadius="md" // Add border radius to match other elements
                    >
                        Add
                    </Button>
                </HStack>
            </VStack>
        </CardContainer>
    );
};

export default ActionCard;
