/* eslint-disable react/prop-types */
import { useState } from "react";

const Day = ({ date, events, onDayClick, onViewEvent }) => {
  if (!date) {
    return <div className="bg-transparent border-0"></div>; // Empty slot
  }

  const today = new Date();
  const isToday =
    date &&
    today.getDate() === Number(date.split("-")[2]) &&
    today.getMonth() + 1 === Number(date.split("-")[1]) &&
    today.getFullYear() === Number(date.split("-")[0]);

  // Check if the date is in the past
  const isPastDate = new Date(date) < today.setHours(0, 0, 0, 0);

  // State to track whether to show all events or just the first two
  const [showAllEvents, setShowAllEvents] = useState(false);
  const visibleEvents = showAllEvents ? events : events.slice(0, 2);

  return (
    <div
      className={`${
        isPastDate
          ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50" // Gray out past dates
          : isToday
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white"
      } day-cell flex flex-col justify-between`}
      onClick={(e) => !isPastDate && onDayClick(e, date)} // Disable click for past dates
    >
      {/* Date Number */}
      <div
        className={`font-semibold ${
          isToday
            ? "text-blue-700"
            : isPastDate
            ? "text-gray-400" // Muted text for past dates
            : "text-gray-800"
        } text-xs md:text-sm`}
      >
        {date.split("-")[2]}
      </div>

      {/* Events */}
      <div className="flex-grow overflow-y-auto">
        {events.length > 0 ? (
          <>
            {visibleEvents.map((event, index) => (
              <div
                key={index}
                className="mt-1 px-2 py-1 rounded text-xs md:text-sm text-white cursor-pointer"
                style={{ backgroundColor: event.color }} // Apply the color dynamically
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the day click
                  onViewEvent(event); // Trigger view event modal
                }}
              >
                {event.title}
              </div>
            ))}
            {events.length > 2 && !showAllEvents && (
              <div
                className="text-xs md:text-sm text-blue-500 mt-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the day click
                  setShowAllEvents(true);
                }}
              >
                {`${events.length - 2} more`}
              </div>
            )}
          </>
        ) : (
          <div className="text-xs md:text-sm text-gray-400">No events</div>
        )}
      </div>
    </div>
  );
};

export default Day;