/* eslint-disable react/prop-types */
import { Fragment } from 'react';

const EventsListModal = ({ isOpen, onClose, events, date }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Fragment>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
          {/* Header */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Events for {formatDate(date)}
            </h2>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-3">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <span
                    className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.startTime} - {event.endTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0">
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg py-2.5 transition duration-200 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EventsListModal;