/* eslint-disable react/prop-types */
import { useState } from "react";
import Calendar from "./Calendar";
import Modal from "./Modal";
import EventDetailsModal from "./EventDetailModal";

const Body = ({ events, setEvents }) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Function to check for time conflicts
  const hasTimeConflict = (newEvent) => {
    return events.some(
      (event) =>
        event.date === newEvent.date &&
        newEvent.startTime < event.endTime && 
        newEvent.endTime > event.startTime 
    );
  };

  // Function to add a new event
  const addEvent = (newEvent) => {
    if (hasTimeConflict(newEvent)) {
      return false;
    }
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...newEvent, isStatic: false }, 
    ]);
    setIsAddEventModalOpen(false);
    return true; 
  };

  // Function to edit an event
  const editEvent = (updatedEvent) => {
    if (updatedEvent.isStatic) {
      setErrorMessage("You cannot edit static data.");
      return;
    }

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setIsAddEventModalOpen(false); 
    setErrorMessage(""); 
  };

  // Function to delete an event
  const deleteEvent = (eventToDelete) => {
    if (eventToDelete.isStatic) {
      setErrorMessage("You cannot delete static data.");
      return;
    }

    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventToDelete.id)
    );
    setIsViewEventModalOpen(false); 
    setErrorMessage(""); 
  };

  return (
    <>
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mx-4">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      {/* Parent Container */}
      <div className="parent-container">
        {/* Calendar Container */}
        <div className="calendar-container">
          <Calendar
            events={events}
            onDayClick={(date) => {
              setSelectedDate(date); 
              setSelectedEvent(null);
              setIsAddEventModalOpen(true);
            }}
            onViewEvent={(event) => {
              setSelectedEvent(event);
              setIsViewEventModalOpen(true); 
            }}
          />
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {isAddEventModalOpen && (
        <Modal
          isOpen={isAddEventModalOpen}
          onClose={() => setIsAddEventModalOpen(false)}
          onSave={selectedEvent ? editEvent : addEvent} 
          date={selectedDate}
          initialEvent={selectedEvent}
        />
      )}

      {/* View Event Modal */}
      {isViewEventModalOpen && (
        <EventDetailsModal
          isOpen={isViewEventModalOpen}
          onClose={() => setIsViewEventModalOpen(false)} 
          event={selectedEvent}
          onEdit={() => {
            if (selectedEvent?.isStatic) {
              setErrorMessage("You cannot edit static data.");
              return;
            }
            setIsViewEventModalOpen(false); 
            setIsAddEventModalOpen(true); 
          }}
          onDelete={() => {
            if (selectedEvent?.isStatic) {
              setErrorMessage("You cannot delete static data.");
              return;
            }
            deleteEvent(selectedEvent); 
          }}
        />
      )}
    </>
  );
};

export default Body;