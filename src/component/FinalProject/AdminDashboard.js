import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Accept / Reject
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/events/${id}`, { status });
      alert(res.data.message); // Show success message
      setEvents(prev => prev.map(ev => ev._id === id ? res.data.updatedEvent : ev));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) return <p>Loading...</p>;

  const pendingEvents = events.filter(ev => ev.status === "pending");

  return (
    <div className="admin-dashboard">
      <h2>Pending Events</h2>
      {pendingEvents.length === 0 && <p>No pending events</p>}

      {pendingEvents.map(event => (
        <div className="event-card" key={event._id}>
          <h3>{event.eventName}</h3>
          <p><b>Club:</b> {event.clubName}</p>
          <p><b>Venue:</b> {event.venue}</p>
          <p><b>Date:</b> {event.date}</p>
          <p><b>Time:</b> {event.startTime} - {event.endTime}</p>

          <div className="action-buttons">
            <button onClick={() => updateStatus(event._id, "accepted")}>Accept</button>
            <button onClick={() => updateStatus(event._id, "rejected")}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
