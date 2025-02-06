/* eslint-disable react/prop-types */
import "./App.css";
import { useState } from "react";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
import eventsData from "./data/events.json"; // Import the JSON file
import EventDetailsModal from "./components/EventDetailModal";

function App() {
  const [events, setEvents] = useState(eventsData); // Initialize state with events from JSON
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      alert("Another event is already scheduled at this time.");
      return false; // Indicate failure
    }

    // Save the event if no conflict
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setIsAddEventModalOpen(false); // Close the modal after saving
    return true; // Indicate success
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold md:text-4xl">My Calendar</h1>
        </div>
      </header>

      {/* Calendar */}
      <div className="calendar-container">
        <Calendar
          events={events}
          onDayClick={(date) => {
            setSelectedDate(date); // Set the selected date
            setIsAddEventModalOpen(true); // Open the add event modal
          }}
          onViewEvent={(event) => {
            setSelectedEvent(event); // Set the selected event
            setIsViewEventModalOpen(true); // Open the view event modal
          }}
        />
      </div>

      {/* Add Event Modal */}
      {isAddEventModalOpen && (
        <Modal
          isOpen={isAddEventModalOpen}
          onClose={() => setIsAddEventModalOpen(false)}
          onSave={addEvent}
          date={selectedDate} // Pass the selected date to the modal
        />
      )}

      {/* View Event Modal */}
      {isViewEventModalOpen && (
        <EventDetailsModal
          isOpen={isViewEventModalOpen}
          onClose={() => setIsViewEventModalOpen(false)}
          event={selectedEvent}
        />
      )}
    </div>
  );
}

export default App;