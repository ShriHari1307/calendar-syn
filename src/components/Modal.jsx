/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSave, date }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [color, setColor] = useState("#3498db");
  const [errorMessage, setErrorMessage] = useState("");

  // Reset modal state when the modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setStartTime("09:00");
      setEndTime("10:00");
      setColor("#3498db");
      setErrorMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate time options in 30-minute increments
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
      times.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return times;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;

    // Validate start time and end time
    if (startTime >= endTime) {
      setErrorMessage("Start time cannot be after or equal to end time.");
      return;
    }

    // Create the new event object
    const newEvent = { date, title, startTime, endTime, color };

    // Call onSave and handle errors
    const success = onSave(newEvent);
    if (!success) {
      setErrorMessage("Another event is already scheduled at this time.");
    } else {
      setErrorMessage(""); // Clear any previous error
      onClose(); // Close the modal after saving
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{
        display: isOpen ? "flex" : "none",
      }}
    >
      {/* Modal Content */}
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative z-50">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add Event</h2>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Event Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Start Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* End Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Event Color */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;