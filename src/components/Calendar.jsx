/* eslint-disable react/prop-types */
import Day from "./Day";
import Modal from "./Modal"; // Import the Modal component
import { useState, } from "react";

// Utility function to check for overlapping events
const isOverlapping = (newEvent, existingEvents) => {
  const [newStart, newEnd] = [
    new Date(`1970-01-01T${newEvent.startTime}:00`),
    new Date(`1970-01-01T${newEvent.endTime || "23:59"}:00`),
  ];

  return existingEvents.some((event) => {
    const [existingStart, existingEnd] = [
      new Date(`1970-01-01T${event.startTime}:00`),
      new Date(`1970-01-01T${event.endTime || "23:59"}:00`),
    ];

    // Check for overlap
    return (
      (newStart >= existingStart && newStart < existingEnd) || // New event starts during an existing event
      (newEnd > existingStart && newEnd <= existingEnd) || // New event ends during an existing event
      (newStart <= existingStart && newEnd >= existingEnd) // New event encompasses an existing event
    );
  });
};

const Calendar = ({ events, onViewEvent, onAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState(""); // State to store error messages
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedDate, setSelectedDate] = useState(null); // State to store the selected date

  // Function to get the first day of the month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Function to get the number of days in the current month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);

  // Calculate the total number of rows needed for the calendar grid
  const totalRows = Math.ceil((firstDayOfMonth + daysInMonth) / 7);

  // Generate the dates array for the calendar grid
  const dates = Array.from({ length: firstDayOfMonth }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getEventsForDate = (day) => {
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === formattedDate);
  };

  // Function to add a new event
  const addEvent = (newEvent) => {
    const formattedDate = `${newEvent.date}`;
    const existingEvents = events.filter((event) => event.date === formattedDate);

    // Check for overlapping events
    if (isOverlapping(newEvent, existingEvents)) {
      setError("An event already exists at this time."); // Set error message
      return;
    }

    // Clear any previous error and add the new event
    setError("");
    onAddEvent(newEvent);
    setIsModalOpen(false); // Close the modal after saving
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 text-xs md:text-sm"
          >
            Previous
          </button>
          <button
            onClick={goToNextMonth}
            className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 text-xs md:text-sm"
          >
            Next
          </button>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div
        className="calendar-grid grid grid-cols-7 gap-2"
        style={{
          gridTemplateRows: `repeat(${totalRows}, minmax(80px, 1fr))`, // Dynamically set rows
        }}
      >
        {dates.map((day, index) => {
          const formattedDate = day
            ? `${currentDate.getFullYear()}-${String(
                currentDate.getMonth() + 1
              ).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            : null;

          // Check if the day is today
          const today = new Date();
          const isToday =
            day &&
            today.getDate() === Number(day) &&
            today.getMonth() + 1 === currentDate.getMonth() + 1 &&
            today.getFullYear() === currentDate.getFullYear();

          return (
            <Day
              key={index}
              date={formattedDate}
              events={day ? getEventsForDate(day) : []}
              onDayClick={(e, date) => {
                setSelectedDate(date); // Set the selected date
                setIsModalOpen(true); // Open the modal
              }}
              onViewEvent={onViewEvent} // Trigger view event modal
              isToday={isToday} // Pass isToday to Day component
            />
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setError(""); // Clear error when closing the modal
        }}
        onSave={addEvent} // Save the event
        onDelete={() => {}} // No delete functionality for new events
        date={selectedDate} // Pass the selected date
        error={error} // Pass the error message to the modal
      />
    </div>
  );
};

export default Calendar;