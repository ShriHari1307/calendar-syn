// EventDetailModal.js
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

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40"
        onClick={onClose}
      />
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all p-6">
          {/* Header */}
          <div className="border-b pb-4">
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: editedEvent.color }}
              />
              <input
                type="text"
                value={editedEvent.title || ""}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, title: e.target.value })
                }
                className="text-xl font-semibold text-gray-900 border rounded px-2 py-1 w-full"
              />
            </div>
          </div>
          {/* Content */}
          <div className="space-y-4 mt-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Start Time</label>
              <input
                type="time"
                value={editedEvent.startTime || ""}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, startTime: e.target.value })
                }
                className="border rounded px-2 py-1 w-full"
              />
              <label className="text-gray-600">End Time</label>
              <input
                type="time"
                value={editedEvent.endTime || ""}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, endTime: e.target.value })
                }
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>
          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            {/* Update Button */}
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-300"
            >
              Update
            </button>
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition duration-300"
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
