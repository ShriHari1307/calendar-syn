/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Modal from "./Modal";
import EventDetailsModal from "./EventDetailModal";

const Body = ({ events, setEvents }) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const hasTimeConflict = (newEvent, eventToExclude = null) => {
    return events.some(
      (event) =>
        event.date === newEvent.date &&
        event.id !== (eventToExclude?.id || null) &&
        newEvent.startTime < event.endTime &&
        newEvent.endTime > event.startTime
    );
  };

  const addEvent = (newEvent) => {
    if (hasTimeConflict(newEvent)) {
      setErrorMessage("An event already exists at this time.");
      return false;
    }
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...newEvent, id: Date.now(), isStatic: false },
    ]);
    setIsAddEventModalOpen(false);
    setErrorMessage("");
    return true;
  };

  const updateEvent = (updatedEvent) => {
    if (updatedEvent.isStatic) {
      setErrorMessage("You cannot edit static data.");
      return;
    }

    if (hasTimeConflict(updatedEvent, updatedEvent)) {
      setErrorMessage("An event already exists at this time.");
      return;
    }

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? { ...updatedEvent } : event
      )
    );
    setIsViewEventModalOpen(false);
    setErrorMessage("");
  };

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

  const handleCalendarAddEvent = (newEvent) => {
    addEvent(newEvent);
  };

  return (
    <>
      {errorMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-200 border border-red-500 text-red-700 px-4 py-2 rounded shadow-md transition-opacity duration-300">
          {errorMessage}
        </div>
      )}

      <Calendar
        key={events.length}
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
        onAddEvent={handleCalendarAddEvent}
      />

      {isAddEventModalOpen && (
        <Modal
          isOpen={isAddEventModalOpen}
          onClose={() => {
            setIsAddEventModalOpen(false);
            setErrorMessage("");
            setSelectedEvent(null);
          }}
          onSave={selectedEvent ? updateEvent : addEvent}
          onDelete={deleteEvent}
          date={selectedDate}
          initialEvent={selectedEvent}
          error={errorMessage}
        />
      )}

      {isViewEventModalOpen && selectedEvent && (
        <EventDetailsModal
          isOpen={isViewEventModalOpen}
          onClose={() => {
            setIsViewEventModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
          onUpdate={updateEvent} 
          onDelete={deleteEvent}
        />
      )}
    </>
  );
};

export default Body;
