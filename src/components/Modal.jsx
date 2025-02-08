/* eslint-disable react/prop-types */
import { useState } from "react";

const Modal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  date,
  initialEvent,
  error,
}) => {
  const [title, setTitle] = useState(initialEvent?.title || "");
  const [startHour, setStartHour] = useState(
    initialEvent?.startTime?.split(":")[0] || "09"
  );
  const [startMinute, setStartMinute] = useState(
    initialEvent?.startTime?.split(":")[1] || "00"
  );
  const [endHour, setEndHour] = useState(
    initialEvent?.endTime?.split(":")[0] || "10"
  );
  const [endMinute, setEndMinute] = useState(
    initialEvent?.endTime?.split(":")[1] || "00"
  );
  const [color, setColor] = useState(initialEvent?.color || "#007bff");
  const [validationError, setValidationError] = useState("");

  if (!isOpen) return null;

  const resetModal = () => {
    setTitle("");
    setStartHour("09");
    setStartMinute("00");
    setEndHour("10");
    setEndMinute("00");
    setColor("#007bff");
    setValidationError(""); // Clear validation error on reset
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = ["00", "15", "30", "45"];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate start time and end time
    const startTimeInMinutes =
      parseInt(startHour, 10) * 60 + parseInt(startMinute, 10);
    const endTimeInMinutes =
      parseInt(endHour, 10) * 60 + parseInt(endMinute, 10);

    if (startTimeInMinutes >= endTimeInMinutes) {
      setValidationError("Start time must be before end time.");
      return;
    }

    // Clear any previous validation errors
    setValidationError("");

    const newEvent = {
      id: initialEvent?.id || Date.now(),
      title,
      startTime: `${startHour}:${startMinute}`,
      endTime: `${endHour}:${endMinute}`,
      color,
      date: date || initialEvent?.date,
    };
    onSave(newEvent);
    resetModal();
  };

  const handleDelete = () => {
    if (onDelete && initialEvent) {
      onDelete(initialEvent);
      resetModal();
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40"
        onClick={onClose}
      />
      {/* Modal Content */}
      <form
        onSubmit={handleSubmit}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md transform transition-all p-6 space-y-4">
          {/* Header */}
          <h2 className="text-xl font-bold text-gray-800">
            {initialEvent ? "Edit Event" : "Add Event"}
          </h2>
          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
              {error}
            </div>
          )}
          {/* Validation Error */}
          {validationError && (
            <div className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
              {validationError}
            </div>
          )}
          {/* Event Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Event Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Start and End Time */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div>
              <label
                htmlFor="startHour"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>
              <div className="flex rounded-md shadow-sm mt-1">
                <select
                  id="startHour"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-l-md border-gray-300 sm:text-sm"
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <select
                  value={startMinute}
                  onChange={(e) => setStartMinute(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-r-md border-gray-300 sm:text-sm"
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
              <label
                htmlFor="endHour"
                className="block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <div className="flex rounded-md shadow-sm mt-1">
                <select
                  id="endHour"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-l-md border-gray-300 sm:text-sm"
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <select
                  value={endMinute}
                  onChange={(e) => setEndMinute(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full px-3 py-2 rounded-r-md border-gray-300 sm:text-sm"
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
          {/* Event Color */}
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Event Color
            </label>
            <input
              type="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1"
            />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetModal();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
            {initialEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Modal;