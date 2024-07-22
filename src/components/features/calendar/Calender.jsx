import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Calendar.css";
import EventForm from "./EventForm";
import EventList from "./EventList";
import MainCalendar from "./MainCalendar";
import { useTheme } from "../../../appContext/appContext";

import {
  fetchEvents,
  addEventAsync,
  updateEventAsync,
  deleteEventAsync,
  updateEvent,
  refreshEvents,
} from "../../../redux/slices/calendarSlice";
import { toast } from "react-toastify";

function Calender() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const status = useSelector((state) => state.events.status);
  const lastUpdate = useSelector((state) => state.events.lastUpdate);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch, lastUpdate]);

  const handleAddEvent = async (eventData) => {
    try {
      await dispatch(addEventAsync(eventData)).unwrap();
      setIsFormOpen(false);
      dispatch(refreshEvents());
      toast.success("Event added successfully");
      window.history.replaceState();
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  const handleEventUpdate = async (eventData) => {
    if (selectedEvent) {
      try {
        const updatedEvent = await dispatch(
          updateEventAsync({
            id: selectedEvent.$id,
            ...eventData,
          })
        ).unwrap();
        dispatch(updateEvent(updatedEvent));
        setSelectedEvent(updatedEvent);
        setIsFormOpen(false);
        dispatch(refreshEvents());
        toast.success("Event updated successfully");
        window.location.reload();
      } catch (error) {
        toast.error("Failed to update event. Please try again.", error);
      }
    }
  };

  const handleEventDelete = async () => {
    if (selectedEvent) {
      try {
        await dispatch(deleteEventAsync(selectedEvent.$id)).unwrap();
        setSelectedEvent(null);
        setIsFormOpen(false);
        dispatch(refreshEvents());
        toast.success("Event deleted successfully");
        window.location.reload();
      } catch (error) {
        toast.error("Failed to delete event:", error);
      }
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleFormCancel = () => {
    setSelectedEvent(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = (eventData) => {
    if (selectedEvent) {
      handleEventUpdate(eventData);
    } else {
      handleAddEvent(eventData);
    }
  };

  const handleSelectSlot = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const { themeMode } = useTheme();

  return (
    <section
      className={`calender-container ${themeMode === "dark" ? "dark" : ""}`}>
      <div className="calender-event-container ">
        <MainCalendar
          events={events}
          onEventSelect={handleEventSelect}
          onSelectSlot={handleSelectSlot}
          setIsFormOpen={setIsFormOpen}
        />

        <EventList
          events={events}
          onEventSelect={handleEventSelect}
          handleEventDelete={handleEventDelete}
        />
      </div>
      <div
        className={`event-form-container + ${
          themeMode === "light" ? "bg-white" : "bg-gray-600"
        }`}>
        {isFormOpen && (
          <EventForm
            event={selectedEvent}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
        {selectedEvent && (
          <button
            onClick={handleEventDelete}
            className="w-full h-11 flex items-center justify-center rounded-lg mt-2 bg-red-500 gap-2  text-white hover:opacity-75 duration-300">
            Delete Event
          </button>
        )}
      </div>
    </section>
  );
}

export default Calender;
