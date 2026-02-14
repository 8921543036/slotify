import React, { useEffect, useState } from "react";
import axios from "axios";

function AcceptedEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events").then(res => {
      setEvents(res.data.filter(e => e.status === "accepted"));
    });
  }, []);

  return (
    <div>
      <h2>Accepted Events</h2>

      {events.map(event => (
        <div key={event._id}>
          <h3>{event.eventName}</h3>
          <p>{event.venue}</p>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}

export default AcceptedEvents;
