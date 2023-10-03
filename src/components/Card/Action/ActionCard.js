import React, { useState, useRef, useEffect } from "react";
import {
    Checkbox,
    VStack,
    HStack,
    Text,
    Input,
    Button,
} from "@chakra-ui/react";
import CardContainer from "../CardContainer";
import { smoothClasses } from "../../Styles/classes";

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
            setNewItem({ title: "", isChecked: false });
        }
    };

    const handleCheckbox = (index) => {
        const updatedSettings = [...props.data];
        updatedSettings[index].isChecked = !updatedSettings[index].isChecked;
        props.onChange(updatedSettings);
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
                scrollContainerRef.current.scrollHeight;
        }
    }, [props.data]);

    return (
        <CardContainer title={props.title}>
            <VStack width="100%">
                <div
                    style={{
                        width: "100%",
                        height: "200px",
                        overflowY: "auto",
                    }}
                    ref={scrollContainerRef}
                >
                    {props.data && props.data.length > 0 ? (
                        props.data.map((data, index) => (
                            <Checkbox
                                key={data.title}
                                sx={smoothClasses}
                                spacing="18px"
                                defaultChecked={data.isChecked}
                                onChange={() => handleCheckbox(index)}
                            >
                                <VStack alignItems="start" spacing={0}>
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
                                        {".date "}
                                    </Text>
                                </VStack>
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
                        size="md"
                        colorScheme="blue"
                        borderRadius="md"
                    >
                        Add
                    </Button>
                </HStack>
            </VStack>
        </CardContainer>
    );
};

export default ActionCard;
