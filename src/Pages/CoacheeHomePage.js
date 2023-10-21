import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Stack, Select } from "@chakra-ui/react";
import { auth } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  getFirestore,
  getDocs,
  documentId,
  collection,
  query,
  where,
} from "firebase/firestore";
import NewSessionModal from "../components/NewSessionModal";
import { useNavigate } from "react-router-dom";

function CoacheeHomePage() {
  const [user, loading] = useAuthState(auth);
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarStart, setCalendarStart] = useState();
  const [calendarEnd, setCalendarEnd] = useState();
  const [newSessionStart, setNewSessionStart] = useState();
  const [newSessionEnd, setNewSessionEnd] = useState();
  const [isNewSessionModalOpen, setNewSessionModalOpen] = useState(false);
  const navigate = useNavigate();
  const firestore = getFirestore();

  useEffect(() => {
    if (user) {
      getDocs(
        query(
          collection(firestore, "join-coach-coachee"),
          where("clientId", "==", user.uid)
        )
      )
        .then((snapshot) => {
          if (snapshot.docs.length) {
            return snapshot.docs.map((d) => d.data().coachId);
          } else {
            throw Error("No coaches");
          }
        })
        .then((coachIds) => {
          if (coachIds.length) {
            getDocs(
              query(
                collection(firestore, "users"),
                where(documentId(), "in", coachIds)
              )
            ).then((snapshot) => {
              if (snapshot.docs.length) {
                setCoaches(
                  snapshot.docs.map((d) => ({
                    name: d.data().name,
                    id: d.data().uid,
                  }))
                );
              } else {
                throw Error("No coaches");
              }
            });
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, [user]);

  const fetchCalendarEvents = () => {
    fetch(
        `https://us-central1-coachconnect-400506.cloudfunctions.net/calendar-event-listener/calendar-events?userId=${selectedCoach}&start=${calendarStart}&end=${calendarEnd}`
      )
        .then((res) => res.json())
        .then((res) => {
          setCalendarEvents(res);
        });
  }

  useEffect(() => {
    if (selectedCoach && calendarStart && calendarEnd) {
        fetchCalendarEvents()
    } else {
        if(!selectedCoach && coaches.length) {
            setSelectedCoach(coaches[0].id)
        }
    }
  }, [selectedCoach, calendarStart, calendarEnd, coaches]);

  return (
    <Box>
      <Stack flex="1" width="100%" bg="white" p={3} gap={5}>
        <Flex>
          <Box flex="1">
            <Text fontSize="2xl" fontWeight={700} lineHeight="150%" w="100%">
              {"Coachee"}
            </Text>
          </Box>
          <Box>
            <Select
              placeholder="Select Coach"
              value={selectedCoach}
              onChange={(e) => {
                setSelectedCoach(e.target.value);
              }}
            >
              {coaches.map((coach) => {
                return (
                  <option key={coach.id} value={coach.id}>
                    {coach.name}
                  </option>
                );
              })}
            </Select>
          </Box>
        </Flex>
        {selectedCoach && (
          <FullCalendar
            plugins={[interactionPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            datesSet={({ start, end }) => {
              setCalendarStart(start.toISOString());
              setCalendarEnd(end.toISOString());
            }}
            events={calendarEvents.map((event) => ({
              id: event.id,
              title: event.summary,
              start: event.start.dateTime,
              end: event.end.dateTime,
            }))}
            selectable={true}
            select={({ start, end }) => {
              setNewSessionStart(start);
              setNewSessionEnd(end);
              setNewSessionModalOpen(true);
            }}
            eventClick={({ event }) => {
                navigate(`/session/${event.id}`)
            }}
          />
        )}
      </Stack>
      {user && (
        <NewSessionModal
          isOpen={isNewSessionModalOpen}
          onClose={() => {
            fetchCalendarEvents()
            setNewSessionModalOpen(false);
          }}
          startTime={newSessionStart}
          endTime={newSessionEnd}
          coachId={selectedCoach}
          coacheeId={user.uid}
        />
      )}
    </Box>
  );
}

export default CoacheeHomePage;
