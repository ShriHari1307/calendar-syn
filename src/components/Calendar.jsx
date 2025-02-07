/* eslint-disable react/prop-types */
import Day from "./Day";
import { useState } from "react";

const Calendar = ({ events, onDayClick, onViewEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
      <div className="days-of-week">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div
        className="calendar-grid flex-grow"
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

          // Disable clicking on past dates
          const today = new Date();
          const isPastDate =
            day &&
            new Date(formattedDate) < today.setHours(0, 0, 0, 0);

          return (
            <Day
              key={index}
              date={formattedDate}
              events={day ? getEventsForDate(day) : []}
              onDayClick={(e, date) => {
                if (!isPastDate) {
                  onDayClick(date); // Trigger add event modal
                }
              }}
              onViewEvent={onViewEvent} // Trigger view event modal
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;