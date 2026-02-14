import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: "",
    clubName: "",
    venue: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.eventName) newErrors.eventName = "Event name is required";
    if (!formData.clubName) newErrors.clubName = "Club name is required";
    if (!formData.venue) newErrors.venue = "Venue is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/events/create", {
        eventName: formData.eventName,
        clubName: formData.clubName,
        venue: formData.venue,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        description: formData.description,
      });

      alert("Event submitted for approval!");
      navigate("/pending-events");
    } catch (error) {
      alert("Failed to create event");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-card">
        <h2>Create Event</h2>
        <p className="subtitle">
          Fill in the details to request a venue booking
        </p>

        <form onSubmit={handleSubmit} className="form">

          {/* Event Name */}
          <div className="field">
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={formData.eventName}
              onChange={handleChange}
              className={errors.eventName ? "error" : ""}
            />
            {errors.eventName && <span>{errors.eventName}</span>}
          </div>

          {/* Club Name */}
          <div className="field">
            <input
              type="text"
              name="clubName"
              placeholder="Club / Organization Name"
              value={formData.clubName}
              onChange={handleChange}
              className={errors.clubName ? "error" : ""}
            />
            {errors.clubName && <span>{errors.clubName}</span>}
          </div>

          {/* Venue */}
          <div className="field">
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={formData.venue}
              onChange={handleChange}
              className={errors.venue ? "error" : ""}
            />
            {errors.venue && <span>{errors.venue}</span>}
          </div>

          {/* Date */}
          <div className="field">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? "error" : ""}
            />
            {errors.date && <span>{errors.date}</span>}
          </div>

          {/* Time */}
          <div className="row">
            <div className="field">
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={errors.startTime ? "error" : ""}
              />
              {errors.startTime && <span>{errors.startTime}</span>}
            </div>

            <div className="field">
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={errors.endTime ? "error" : ""}
              />
              {errors.endTime && <span>{errors.endTime}</span>}
            </div>
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe your event..."
            value={formData.description}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="buttons">
            <button type="button" className="cancel" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="submit" disabled={loading}>
              {loading ? "Submitting..." : "Create Event"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
