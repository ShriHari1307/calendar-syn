/* eslint-disable react/prop-types */
import { Fragment } from "react";

const EventDetailsModal = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: event.color }}
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Start Time</span>
                <span className="font-medium text-gray-900">
                  {event.startTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">End Time</span>
                <span className="font-medium text-gray-900">
                  {event.endTime}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 flex justify-end gap-3">
            {/* Edit Button */}
            <button
              onClick={onEdit} // Open the edit modal
              className={`px-4 py-2 ${
                event.isStatic
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-medium rounded-lg transition duration-200 active:scale-95`}
              disabled={event.isStatic} // Disable if static
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={onDelete} // Delete the event
              className={`px-4 py-2 ${
                event.isStatic
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } text-white font-medium rounded-lg transition duration-200 active:scale-95`}
              disabled={event.isStatic} // Disable if static
            >
              Delete
            </button>

            {/* Close Button */}
            <button
              onClick={onClose} // Close the modal
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition duration-200 active:scale-95"
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