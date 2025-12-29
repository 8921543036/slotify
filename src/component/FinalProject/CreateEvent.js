import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: "",
    clubName: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    description: "",
    poster: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      poster: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Data:", formData);
    alert("Event submitted for approval!");
    navigate("/");
  };

  return (
    <div className="create-event-page">
      <div className="create-event-card">
        {/* Header */}
        <div className="header">
          <span className="back-arrow" onClick={() => navigate(-1)}>←</span>
          <h2>Create Event</h2>
        </div>

        {/* Form */}
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="clubName"
            placeholder="Club Name"
            value={formData.clubName}
            onChange={handleChange}
            required
          />

          <div className="row">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          {/* Upload Poster */}
          <label className="upload">
            <div className="upload-icon">🖼</div>
            <span>upload poster photo</span>
            <input type="file" hidden onChange={handleFileChange} />
          </label>

          {/* Buttons */}
          <div className="buttons">
            <button
              type="button"
              className="cancel"
              onClick={() => navigate(-1)}
            >
              cancel
            </button>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;


