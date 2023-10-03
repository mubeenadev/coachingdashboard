import React from "react";
import CardContainer from "../CardContainer";
import { VStack } from "@chakra-ui/react";
import ResourcesRow from "./ResourcesRow";
import ResourceModal from "./ResourceModal";

const ResourceCard = (props) => {
    const { children, data } = props;

    return (
        <CardContainer title="Resource">
            <VStack>
                <div
                    style={{
                        width: "100%",
                        height: "200px", // Set the maximum height for scrollability
                        overflowY: "auto", // Enable vertical scrolling
                    }}
                >
                    {data.map((row, index) => {
                        return (
                            <ResourcesRow
                                key={index}
                                title={row.title}
                                category={row.category}
                                link={row.link}
                            />
                        );
                    })}
                </div>
                {children}
            </VStack>
        </CardContainer>
    );
};

export default ResourceCard;
