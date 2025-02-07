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
        newEvent.startTime < event.endTime && // New event starts before existing event ends
        newEvent.endTime > event.startTime // New event ends after existing event starts
    );
  };

  // Function to add a new event
  const addEvent = (newEvent) => {
    if (hasTimeConflict(newEvent)) {
      return false; // Indicate failure
    }
    // Add the event with isStatic: false
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...newEvent, isStatic: false }, // Mark user-added events as non-static
    ]);
    setIsAddEventModalOpen(false); // Close the modal after saving
    return true; // Indicate success
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
    setIsAddEventModalOpen(false); // Close the modal after editing
    setErrorMessage(""); // Clear any previous error message
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
    setIsViewEventModalOpen(false); // Close the modal after deleting
    setErrorMessage(""); // Clear any previous error message
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
              setSelectedDate(date); // Set the selected date
              setSelectedEvent(null); // Clear the selected event when adding a new one
              setIsAddEventModalOpen(true); // Open the add event modal
            }}
            onViewEvent={(event) => {
              setSelectedEvent(event); // Set the selected event for viewing
              setIsViewEventModalOpen(true); // Open the view event modal
            }}
          />
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {isAddEventModalOpen && (
        <Modal
          isOpen={isAddEventModalOpen}
          onClose={() => setIsAddEventModalOpen(false)}
          onSave={selectedEvent ? editEvent : addEvent} // Use editEvent if editing, otherwise addEvent
          date={selectedDate} // Pass the selected date to the modal
          initialEvent={selectedEvent} // Pass the selected event for editing
        />
      )}

      {/* View Event Modal */}
      {isViewEventModalOpen && (
        <EventDetailsModal
          isOpen={isViewEventModalOpen}
          onClose={() => setIsViewEventModalOpen(false)} // Close modal
          event={selectedEvent}
          onEdit={() => {
            if (selectedEvent?.isStatic) {
              setErrorMessage("You cannot edit static data.");
              return;
            }
            setIsViewEventModalOpen(false); // Close the view modal
            setIsAddEventModalOpen(true); // Open the add/edit modal for editing
          }}
          onDelete={() => {
            if (selectedEvent?.isStatic) {
              setErrorMessage("You cannot delete static data.");
              return;
            }
            deleteEvent(selectedEvent); // Delete the event
          }}
        />
      )}
    </>
  );
};

export default Body;