import React from "react";
import { Stack, Text } from "@chakra-ui/react";

function CardContainer(props) {
    const { variant, children, ...rest } = props;

    return (
        <Stack
            maxW="360px"
            justifyContent="center"
            alignItems="center"
            bg="white"
            p={3}
            borderRadius={24}
            boxShadow="0px 8px 16px rgba(58, 58, 68, 0.12), 0px 16px 32px rgba(90, 91, 106, 0.12);"
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
