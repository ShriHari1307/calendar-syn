/* eslint-disable react/prop-types */
import { useState } from "react";
import EventsListModal from "./EventsListModal";

const Day = ({ date, events, onDayClick, onViewEvent, isToday, error }) => {
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  // If no date is provided, render an empty cell
  if (!date) {
    return <div className="bg-transparent border-0"></div>;
  }

  const today = new Date();
  const isPastDate = new Date(date) < today.setHours(0, 0, 0, 0);

  // Display only the first two events
  const visibleEvents = events.slice(0, 2); // Show only the first two events
  const remainingEvents = events.length - visibleEvents.length; // Calculate remaining events

  return (
    <>
      <div
        className={`${
          isPastDate
            ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50" // Past dates
            : isToday
            ? "today" // Apply the 'today' class
            : "border-gray-200 bg-white" // Default dates
        } day-cell h-full flex flex-col`}
        style={{ minHeight: "120px" }} // Fixed minimum height for all day cells
        onClick={(e) => !isPastDate && onDayClick(e, date)}
      >
        {/* Date Number */}
        <div
          className={`font-semibold p-1 ${
            isToday
              ? "text-blue-700" // Current day text color
              : isPastDate
              ? "text-gray-400" // Past date text color
              : "text-gray-800" // Default text color
          } text-xs md:text-sm`}
        >
          {date.split("-")[2]}
        </div>

        {/* Events Container */}
        <div
          className="flex-1 p-1 flex flex-col justify-start space-y-1 overflow-hidden" // Prevent scrolling
          style={{ maxHeight: "calc(100% - 30px)" }} // Ensure events don't overflow the cell
        >
          {events.length > 0 ? (
            <div className="space-y-1">
              {/* Visible Events */}
              {visibleEvents.map((event, index) => (
                <div
                  key={index}
                  className="px-2 py-1 rounded-md text-xs md:text-sm text-white font-medium cursor-pointer truncate shadow-sm transition duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: event.color,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewEvent(event);
                  }}
                  title={event.title} // Tooltip for truncated text
                >
                  {event.title}
                </div>
              ))}
              {/* Remaining Events Indicator */}
              {remainingEvents > 0 && (
                <div
                  className="text-xs text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEventsModalOpen(true);
                  }}
                >
                  +{remainingEvents} more
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-500 italic">No events</div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-xs mt-1">{error}</div>
          )}
        </div>
      </div>

      {/* Events List Modal */}
      <EventsListModal
        isOpen={isEventsModalOpen}
        onClose={() => setIsEventsModalOpen(false)}
        events={events}
        date={date}
      />
    </>
  );
};

export default Day;