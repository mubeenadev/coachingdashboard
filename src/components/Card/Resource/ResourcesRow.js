import React from "react";
import { Text, Flex, Spacer, Button, Icon, Link } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
const ResourcesRow = ({ title, category, link }) => {
    return (
        <Flex
            width={"100%"}
            alignItems="center"
            marginBottom={"15px"}
            marginEnd={"15px"}
        >
            <Flex direction="column">
                <Text fontSize="md" color={"gray.700"} fontWeight="semibold">
                    {title}
                </Text>
                <Text
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="semibold"
                    me="16px"
                >
                    {category}
                </Text>
            </Flex>
            <Spacer />
            <Link href={link} isExternal>
                <Button p="0px" bg="transparent" variant="no-hover">
                    <Flex alignItems="center" p="12px">
                        <Icon
                            as={FaExternalLinkAlt}
                            w="20px"
                            h="auto"
                            me="5px"
                        />
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
};
export default ResourcesRow;
