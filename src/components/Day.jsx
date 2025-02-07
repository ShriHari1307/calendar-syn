/* eslint-disable react/prop-types */
import { useState } from "react";
import EventsListModal from "./EventsListModal";

const Day = ({ date, events, onDayClick, onViewEvent }) => {
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  if (!date) {
    return <div className="bg-transparent border-0"></div>;
  }

  const today = new Date();
  const isToday =
    date &&
    today.getDate() === Number(date.split("-")[2]) &&
    today.getMonth() + 1 === Number(date.split("-")[1]) &&
    today.getFullYear() === Number(date.split("-")[0]);

  const isPastDate = new Date(date) < today.setHours(0, 0, 0, 0);

  // Display only the first two events
  const visibleEvents = events.slice(0, 2);
  const remainingEvents = events.length - 2;

  return (
    <>
      <div
        className={`${
          isPastDate
            ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
            : isToday
            ? "border-blue-500 bg-blue-50 border-2"
            : "border-gray-200 bg-white"
        } day-cell h-full flex flex-col`}
        style={{ minHeight: "120px" }} // Fixed minimum height for all day cells
        onClick={(e) => !isPastDate && onDayClick(e, date)}
      >
        {/* Date Number */}
        <div
          className={`font-semibold p-1 ${isToday ? "text-blue-700" : isPastDate ? "text-gray-400" : "text-gray-800"} text-xs md:text-sm`}
        >
          {date.split("-")[2]}
        </div>

        {/* Events Container */}
        <div
          className="flex-1 p-1 flex flex-col justify-start overflow-hidden" // Prevent scrolling
          style={{ maxHeight: "calc(100% - 30px)" }} // Ensure events don't overflow the cell
        >
          {events.length > 0 ? (
            <div className="space-y-1">
              {visibleEvents.map((event, index) => (
                <div
                  key={index}
                  className="px-1 py-0.5 rounded text-xs md:text-sm text-white cursor-pointer truncate"
                  style={{ backgroundColor: event.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewEvent(event);
                  }}
                  title={event.title} // Tooltip for truncated text
                >
                  {event.title}
                </div>
              ))}
              {remainingEvents > 0 && (
                <div
                  className="text-xs text-blue-500 cursor-pointer hover:text-blue-600 mt-0.5"
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
            <div className="text-xs text-gray-400">No events</div>
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
