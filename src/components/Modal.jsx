/* eslint-disable react/prop-types */
import { useState } from "react";

const Modal = ({ isOpen, onClose, onSave, onDelete, date, initialEvent, error }) => {
  const [title, setTitle] = useState(initialEvent?.title || "");
  const [startHour, setStartHour] = useState(
    initialEvent?.startTime.split(":")[0] || "09"
  );
  const [startMinute, setStartMinute] = useState(
    initialEvent?.startTime.split(":")[1] || "00"
  );
  const [endHour, setEndHour] = useState(
    initialEvent?.endTime.split(":")[0] || "10"
  );
  const [endMinute, setEndMinute] = useState(
    initialEvent?.endTime.split(":")[1] || "00"
  );
  const [color, setColor] = useState(initialEvent?.color || "#007bff");

  if (!isOpen) return null;

  const resetModal = () => {
    setTitle("");
    setStartHour("09");
    setStartMinute("00");
    setEndHour("10");
    setEndMinute("00");
    setColor("#007bff");
  };

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all p-6 space-y-4">
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Start Time
            </label>
            <div className="flex gap-2">
              <select
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="w-1/2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
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
                className="w-1/2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              End Time
            </label>
            <div className="flex gap-2">
              <select
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="w-1/2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
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
                className="w-1/2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Event Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetModal();
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition duration-200 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200 active:scale-95"
            >
              Save
            </button>
            {initialEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200 active:scale-95"
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