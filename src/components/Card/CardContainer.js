import React from "react";
import { Stack, Text } from "@chakra-ui/react";

function CardContainer(props) {
    const { variant, children, ...rest } = props;

    return (
        <Stack
            flex="1"
            width="100%"
            justifyContent="center"
            alignItems="center"
            bg="white"
            p={3}
            borderRadius={20}
            borderWidth="2px"
            borderColor="#CBD5E0"
        >
            <Text
                fontSize="2xl"
                fontWeight={700}
                lineHeight="150%"
                w="100%"
                ml={2}
                mb={2}
            >
                {props.title}
            </Text>

            {children}
        </Stack>
    );
}

export default CardContainer;
