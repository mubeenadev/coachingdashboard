import React from "react";
import CardContainer from "../CardContainer";
import { VStack, Box } from "@chakra-ui/react";
import ResourcesRow from "./ResourcesRow";

const ResourceCard = ({ children, data }) => {
    return (
        <CardContainer title="Resource">
            <VStack width="100%" padding={5} maxHeight={300} minH={300}>
                <Box
                    width="100%"
                    maxHeight="200px"
                    overflowY="auto"
                    marginBottom={4}
                >
                    {data && data.length > 0 ? (
                        data.map((row, index) => (
                            <ResourcesRow
                                key={index}
                                title={row.title}
                                category={row.category}
                                link={row.link}
                            />
                        ))
                    ) : (
                        <p>No resources available</p>
                    )}
                </Box>
                {children}
            </VStack>
        </CardContainer>
    );
};

export default ResourceCard;
