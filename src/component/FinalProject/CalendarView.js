import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css";

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  // Fetch events from backend on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);                 // store all events
        filterEventsByDate(res.data, selectedDate); // filter today events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [selectedDate]);

  // Filter events by selected date
  const filterEventsByDate = (allEvents, date) => {
    const dateStr = date.toISOString().split("T")[0];
    const filtered = allEvents.filter(
      (event) => event.date === dateStr
    );
    setSelectedEvents(filtered);
  };

  // Highlight days that have events
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      const hasEvent = events.some(
        (event) => event.date === dateStr
      );
      return hasEvent ? "event-day" : null;
    }
  };

  // When user clicks a date
  const handleDateClick = (date) => {
    setSelectedDate(date);
    filterEventsByDate(events, date);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <h2 className="calendar-title">Calendar View</h2>

        <Calendar
          value={selectedDate}
          onChange={handleDateClick}
          tileClassName={tileClassName}
          showNeighboringMonth={false}
        />
      </div>

      <div className="event-section">
        {selectedEvents.length === 0 ? (
          <p className="no-events">No events on this date</p>
        ) : (
          selectedEvents.map((event) => (
            <div className="event-card" key={event._id}>
              <h3>{event.eventName}</h3>

              <p>
                {event.startTime} – {event.endTime}
              </p>

              <p>
                <strong>Venue:</strong> {event.venue}
              </p>

              <p>{event.description}</p>

              <button
                onClick={() => navigate(`/event/${event._id}`)}
              >
                View
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarView;
