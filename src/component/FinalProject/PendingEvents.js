import React, { useEffect, useState } from "react";
import "./PendingEvents.css";

function PendingEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Load pending events
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const pendingEvents = storedEvents.filter(
      (event) => event.status === "Pending"
    );
    setEvents(pendingEvents);
  }, []);

  // Approve / Reject handler
  const updateStatus = (id, newStatus) => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

    const updatedEvents = storedEvents.map((event) =>
      event.id === id ? { ...event, status: newStatus } : event
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    setEvents(updatedEvents.filter((event) => event.status === "Pending"));
    setSelectedEvent(null);
  };

  return (
    <div className="pending-page">
      <h2>Pending Events</h2>

      {events.length === 0 ? (
        <p className="empty">No pending events</p>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.shortDesc}</p>

              <div className="card-buttons">
                <button onClick={() => setSelectedEvent(event)}>
                  View More
                </button>

                <button
                  className="approve"
                  onClick={() => updateStatus(event.id, "Approved")}
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => updateStatus(event.id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View More Modal */}
      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.fullDesc}</p>

            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Venue:</strong> {selectedEvent.venue}</p>

            <button className="close" onClick={() => setSelectedEvent(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingEvents;
