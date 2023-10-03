import React from "react";
import CardContainer from "../CardContainer";
import { VStack, Box } from "@chakra-ui/react";
import {
    Text,
    Flex,
    Spacer,
    Button,
    Icon,
    Link,
    HStack,
    Stack,
} from "@chakra-ui/react";

const Client = [
    {
        name: "Sally",
        coach_category: "Job",
        type: "AVG",
    },
    {
        name: "Mika",
        coach_category: "Business",
        type: "Private",
    },
    {
        name: "Blippi",
        coach_category: "Job",
        type: "AVG",
    },
    {
        name: "Jolly",
        coach_category: "Career change",
        type: "AVG",
    },
    {
        name: "Sally",
        coach_category: "Job",
        type: "AVG",
    },
    {
        name: "Mika",
        coach_category: "Business",
        type: "Private",
    },
    {
        name: "Blippi",
        coach_category: "Job",
        type: "AVG",
    },
    {
        name: "Jolly",
        coach_category: "Career change",
        type: "AVG",
    },
];

const ClientCard = () => {
    const data = Client;
    return (
        <CardContainer title="Clients">
            <VStack width={"100%"} p={5} maxHeight={300}>
                <Box
                    style={{
                        flex: 1,
                        width: "100%",
                        height: "200px", // Set the maximum height for scrollability
                        overflowY: "auto", // Enable vertical scrolling
                    }}
                >
                    {data.map((row, index) => {
                        return (
                            <Flex
                                key={index}
                                width={"100%"}
                                alignItems="center"
                            >
                                <Stack>
                                    <Text
                                        fontSize="md"
                                        color={"gray.700"}
                                        fontWeight="semibold"
                                    >
                                        {row.name}
                                    </Text>
                                    <Text
                                        fontSize="sm"
                                        color="gray.400"
                                        fontWeight="semibold"
                                        me="16px"
                                    >
                                        {row.coach_category}
                                    </Text>
                                </Stack>
                                <Spacer />
                                <Link href="#" isExternal>
                                    <Button
                                        p="0px"
                                        bg="transparent"
                                        variant="no-hover"
                                    >
                                        <Flex alignItems="center" p="12px">
                                            <Text
                                                fontSize="md"
                                                color={"gray.700"}
                                                fontWeight="bold"
                                            >
                                                Open
                                            </Text>
                                        </Flex>
                                    </Button>
                                </Link>
                            </Flex>
                        );
                    })}
                </Box>
            </VStack>
        </CardContainer>
    );
};

export default ClientCard;
