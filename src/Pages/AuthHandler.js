import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/Firebase";
import { Box } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";


function AuthHandler() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(user) {
            console.log(searchParams)
            console.log(user)
            fetch(`https://us-central1-coachconnect-400506.cloudfunctions.net/calendar-event-listener/configure-calendar?code=${searchParams.get('code')}&userId=${user.uid}`)
            .then(res => {
                console.log(res)
                navigate('/')
            })
        }
        
    }, [user]);

    return (
        <Box>
            Loading
        </Box>
    );
}
export default AuthHandler;
