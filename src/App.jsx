/* eslint-disable react/prop-types */
import "./App.css";
import { useState } from "react";
import Header from "./components/Header"; // Import the Header component
import Body from "./components/Body"; // Import the Body component
import eventsData from "./data/events.json"; // Import the JSON file

function App() {
  // Mark all events from events.json as static (isStatic: true)
  const initialEvents = eventsData.map((event) => ({ ...event, isStatic: true }));

  const [events, setEvents] = useState(initialEvents); // Initialize state with static events

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Body */}
      <Body events={events} setEvents={setEvents} />
    </div>
  );
}

export default App;