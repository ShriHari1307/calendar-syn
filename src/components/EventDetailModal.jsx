/* eslint-disable react/prop-types */
import { Fragment } from "react";

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <Fragment>
      <div
        className="fixed inset-0 flex justify-center items-center z-50"
        style={{
          display: isOpen ? "flex" : "none",
        }}
      >
        {/* Modal Content */}
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative z-50">
          <h2 className="text-xl font-bold mb-4">{event.title}</h2>
          <p className="text-sm text-gray-600">
            <strong>Start Time:</strong> {event.startTime}
          </p>
          <p className="text-sm text-gray-600">
            <strong>End Time:</strong> {event.endTime}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Color:</strong>{" "}
            <span
              className="inline-block w-4 h-4 rounded-full ml-2"
              style={{ backgroundColor: event.color }}
            ></span>
          </p>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              onClick={onClose} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EventDetailsModal;