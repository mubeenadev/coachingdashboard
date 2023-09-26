import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Calendar from "@ericz1803/react-google-calendar";

const API_KEY = "AIzaSyAcXPbqn1kEqllNglh494dYKA-iMNjb2-E";
let calendars = [
    {
        calendarId: "mubeenahamza@gmail.com",
    },
];

function CoachHomePage() {
    const navigate = useNavigate();
    return (
        <div>
            CoachHomePage
            <div>
                <Calendar apiKey={API_KEY} calendars={calendars} />
            </div>
            <Button
                onClick={(e) => {
                    navigate("/session/id");
                }}
            >
                Session
            </Button>
        </div>
    );
}

export default CoachHomePage;
