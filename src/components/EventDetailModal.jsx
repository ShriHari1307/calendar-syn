/* eslint-disable react/prop-types */
import { Fragment, useState, useEffect } from "react";

const EventDetailsModal = ({ isOpen, onClose, event, onUpdate, onDelete }) => {
  const [editedEvent, setEditedEvent] = useState(event || {});

  useEffect(() => {
    setEditedEvent(event || {}); // Ensure state updates when event changes
  }, [event]);

  if (!isOpen || !event) return null;

  const handleUpdate = () => {
    onUpdate(editedEvent);
    onClose();
  };

  const handleDelete = () => {
    onDelete(event);
    onClose();
  };

  // Generate hour and minute options
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md transform transition-all p-6 space-y-4">
          {/* Header */}
          <div className="border-b pb-4">
            <div className="flex items-center gap-3">
              {/* Color Picker */}
              <input
                type="color"
                value={editedEvent.color || "#007bff"} // Default color
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, color: e.target.value })
                }
                className="w-10 h-10 p-0 border-none bg-transparent cursor-pointer"
              />
              {/* Title Input */}
              <input
                type="text"
                value={editedEvent.title || ""}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, title: e.target.value })
                }
                className="text-xl font-semibold text-gray-900 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Event Title"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <div className="flex gap-2 mt-1">
                {/* Hour Dropdown */}
                <select
                  value={editedEvent.startTime?.split(":")[0] || "09"}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      startTime: `${e.target.value}:${editedEvent.startTime?.split(":")[1] || "00"}`,
                    })
                  }
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-l-md border border-gray-300 sm:text-sm"
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>

                {/* Minute Dropdown */}
                <select
                  value={editedEvent.startTime?.split(":")[1] || "00"}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      startTime: `${editedEvent.startTime?.split(":")[0] || "09"}:${e.target.value}`,
                    })
                  }
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-r-md border border-gray-300 sm:text-sm"
                >
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <div className="flex gap-2 mt-1">
                {/* Hour Dropdown */}
                <select
                  value={editedEvent.endTime?.split(":")[0] || "10"}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      endTime: `${e.target.value}:${editedEvent.endTime?.split(":")[1] || "00"}`,
                    })
                  }
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-l-md border border-gray-300 sm:text-sm"
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>

                {/* Minute Dropdown */}
                <select
                  value={editedEvent.endTime?.split(":")[1] || "00"}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      endTime: `${editedEvent.endTime?.split(":")[0] || "10"}:${e.target.value}`,
                    })
                  }
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-r-md border border-gray-300 sm:text-sm"
                >
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-2">
            {/* Update Button */}
            <button
              onClick={handleUpdate}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EventDetailsModal;