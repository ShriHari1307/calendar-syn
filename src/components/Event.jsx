/* eslint-disable react/prop-types */

const Event = ({ event }) => {
  const { title, startTime, endTime, color } = event;

  return (
    <div
      className="mt-1 p-1 text-xs text-white rounded"
      style={{ backgroundColor: color }}
    >
      <strong>{title}</strong> <br />
      {startTime} - {endTime || 'N/A'}
    </div>
  );
};

export default Event;