import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();       // id from URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];

    // Safer comparison (handles string/number id)
    const foundEvent = events.find(
      (e) => String(e.id) === String(id)
    );

    setEvent(foundEvent || null);
  }, [id]);

  if (!event) {
    return (
      <div style={{ padding: "40px" }}>
        <button onClick={() => navigate(-1)}>← Back</button>
        <p style={{ marginTop: "20px" }}>Event not found</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2 style={{ marginTop: "20px" }}>{event.eventName}</h2>

      <p><strong>Club:</strong> {event.clubName}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p>
        <strong>Time:</strong> {event.startTime} – {event.endTime}
      </p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Status:</strong> {event.status}</p>
    </div>
  );
}

export default EventDetails;
