import React from "react";
import CardContainer from "./Card/CardContainer";
import { VStack } from "@chakra-ui/react";
import ResourcesRow from "./ResourcesRow";
const resourcesData = [
    {
        title: "Secret of success",
        category: "presentation",
        link: "#",
    },
    {
        title: "Avoid mistakes in cv",
        category: "coverletter",
        link: " ",
    },
    {
        title: "Better talk April, 05, 2020",
        category: "communication",
        link: "#",
    },
    {
        title: "June, 25, 2019",
        category: "#QW-103578",
        link: "#",
    },
];

const ResourceCard = (props) => {
    const data = resourcesData;
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
            </VStack>
        </CardContainer>
    );
};

export default ResourceCard;
