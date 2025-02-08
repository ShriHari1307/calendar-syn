// Day.js
/* eslint-disable react/prop-types */
import { useState } from "react";
import EventsListModal from "./EventsListModal";

const Day = ({ date, events, onDayClick, onViewEvent, isToday }) => {
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  if (!date) {
    return <div className="bg-transparent border-0"></div>;
  }

  const today = new Date();
  const isPastDate = new Date(date) < today.setHours(0, 0, 0, 0);

  const visibleEvents = events.slice(0, 2);
  const remainingEvents = events.length - visibleEvents.length;

  return (
    <>
      <div
        className={`${
          isPastDate
            ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
            : isToday
            ? "today"
            : "border-gray-200 bg-white"
        } day-cell h-full flex flex-col`}
        style={{ minHeight: "120px" }}
        onClick={(e) => !isPastDate && onDayClick(e, date)}
      >
        <div
          className={`font-semibold p-1 ${
            isToday
              ? "text-blue-700"
              : isPastDate
              ? "text-gray-400"
              : "text-gray-800"
          } text-xs md:text-sm`}
        >
          {date.split("-")[2]}
        </div>

        <div
          className="flex-1 p-1 flex flex-col justify-start space-y-1 overflow-hidden"
          style={{ maxHeight: "calc(100% - 30px)" }}
        >
          {events.length > 0 ? (
            <div className="space-y-1">
              {visibleEvents.map((event, index) => (
                <div
                  key={index}
                  className="px-2 py-1 rounded-md text-xs md:text-sm text-white font-medium cursor-pointer truncate shadow-sm transition duration-300 hover:shadow-md"
                  style={{ backgroundColor: event.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewEvent(event);
                  }}
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
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
        </div>
      </div>

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