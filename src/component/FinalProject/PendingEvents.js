import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PendingEvents.css";

function PendingEvents() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");

 

  useEffect(() => {
     const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/events/status/${filter}`
      );
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };
    fetchEvents();
  }, [filter]);

  // 🔍 Search filter logic
  const filteredEvents = events.filter((ev) =>
    `${ev.eventName} ${ev.clubName} ${ev.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="pending-container">
      {/* Filters */}
      <div className="filter-buttons">
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={filter === "accepted" ? "active" : ""}
          onClick={() => setFilter("accepted")}
        >
          Accepted
        </button>
        <button
          className={filter === "rejected" ? "active" : ""}
          onClick={() => setFilter("rejected")}
        >
          Rejected
        </button>
      </div>

      {/* 🔍 Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by event or club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <p>No {filter} events found</p>
      )}

      {/* Event Cards */}
      {filteredEvents.map((ev) => (
        <div key={ev._id} className="pending-card">
          <h3>{ev.eventName}</h3>
          <p>{ev.description}</p>
          <p><b>Club:</b> {ev.clubName}</p>
          <p><b>Date:</b> {ev.date}</p>
          <p><b>Time:</b> {ev.startTime} - {ev.endTime}</p>
          <span className={`badge ${ev.status}`}>
            {ev.status.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default PendingEvents;
