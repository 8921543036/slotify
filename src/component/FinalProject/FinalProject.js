import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./FinalProject.css";
import slotify from "./slotify.png";
import phone from "./phone.png";
import home from "./home.jpg";
import Login from "./Login";
import PrincipleLogin from "./PrincipleLogin";
import Profile from "./Profile";
import Arrow from "./Arrow.png";
import permission from"./permission.jpg";

function FinalProject() {
  // --- State Hooks ---
  const [activeNav, setActiveNav] = useState("Home");
  const [showStudentLogin, setShowStudentLogin] = useState(false);
  const [showPrincipleLogin, setShowPrincipleLogin] = useState(false);
  const [showMoreAbout, setShowMoreAbout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // --- Contact Form State ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // --- Refs for Scrolling ---
  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const bookVenueRef = useRef(null);
  const contactRef = useRef(null);

  // --- Nav Items ---
  const navItems = ["Home", "About", "Services", "BookVenue", "Contact"];

  // --- Navigation Click Handler ---
  const handleNavClick = (item) => {
    setActiveNav(item);
    if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item === "About" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (item === "Services" && serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (item === "BookVenue" && bookVenueRef.current) {
      bookVenueRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (item === "Contact" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- Navigation for Create Event ---
  const navigate = useNavigate();

  const goToCreateEvent = () => {
    if (isLoggedIn) {
      navigate("/create-event");
    } else {
      setShowStudentLogin(true);
    }
  };

  const goToPendingEvents = () => {
    if (isLoggedIn) {
      navigate("/pending-events");
    } else {
      setShowStudentLogin(true);
    }
  };

  return (
    <div className="main">
      <div className="main warpper">
        <div className="app-container">

          {/* ---------------- NAVBAR ---------------- */}
          <nav className="navbar">
            <div className="nav__left">
              <img
                src={slotify}
                alt="Slotify Logo"
                className="logo"
                onClick={() => handleNavClick("Home")}
                style={{ cursor: "pointer" }}
              />
            </div>
            <ul className="nav__center">
              {navItems.map((item) => (
                <li
                  key={item}
                  className={activeNav === item ? "nav__link--active" : "nav__link"}
                  onClick={() => handleNavClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          <div className="nav__right">
  {isLoggedIn && userData ? (
    <Profile
      user={userData}
      onLogout={() => {
        setIsLoggedIn(false);
        setUserData(null);
      }}
    />
  ) : (
    <>
      <button
        className="btn btn--secondary"
        onClick={() => setShowStudentLogin(true)}
      >
        Login
      </button>

      <button
        className="btn btn--primary"
        onClick={() => setShowPrincipleLogin(true)}
      >
        Sign Up
      </button>
    </>
  )}
</div>

          </nav>

          {/* ---------------- HERO SECTION ---------------- */}
          <section className="hero">
            <div className="hero__content">
              <h1 className="hero__title">
                Your Space,<br />Just Click Away
              </h1>
              <p className="hero__subtitle">
                Turn your dream events into reality today.
              </p>
              <p className="hero__description">
                Enjoy the ease of discovering unique spaces, checking availability, and securing your date instantly.
              </p>
              <div className="hero__btn-group">
                <button
                  className="btn btn--solid-white"
                  onClick={() => setShowStudentLogin(true)}
                >
                  Get Started
                </button>
                <button
                  className="btn btn--outline-white"
                  onClick={() => handleNavClick("BookVenue")}
                >
                  Book Venue
                </button>
              </div>
            </div>
            <div className="hero__image-container">
              <img
                src={phone}
                className="phone-mockup animated-phone"
                alt="Mobile App Mockup"
              />
              
            </div>
            
          </section>
          </div>

          {/* ---------------- WHAT WE DO SECTION ---------------- */}
          <section className="what-we-do show" ref={aboutRef}>
            <h2 className="what-we-do__title">What Will Do?</h2>
            <p className="what-we-do__description">
              We offer a user-friendly platform that simplifies booking venues within the college for events, meetings, and workshops.
              <br />
              Students and staff can explore available spaces, check real-time availability, make reservations instantly, and manage all bookings from a single dashboard.
              {showMoreAbout && (
                <>
                  <br />
                  Designed to save time and reduce confusion, the system ensures smooth coordination and improved event organization with features like notifications, calendar sync, and easy cancellation management.
                </>
              )}
            </p>
            <button
              className="btn btn--read-more"
              onClick={() => setShowMoreAbout(!showMoreAbout)}
            >
              {showMoreAbout ? "Show Less" : "Show More"}
            </button>
          </section>
          

          {/* ---------------- OUR SERVICES SECTION ---------------- */}
          <section className="services" ref={serviceRef}>
            <h2 className="services__title">Our Services</h2>
            <div className="services__container">
              {[
                {
                  image: home,
                  title: "Venue Booking",
                  description: "We provide an easy online system to book college venues for events, meetings, and workshops.",
                },
                {
                  image: home,
                  title: "Real-Time Availability",
                  description: "Check the live status of all college spaces to instantly secure your preferred date and time slot.",
                },
                {
                  image: permission,
                  title: "Secure Management",
                  description: "Manage all your reservations and event details from a secure, personalized dashboard.",
                },
              ].map((card, index) => (
                <div className="service-card" key={index}>
                  <div className="service-card__icon-box">
                    <img src={card.image} alt={card.title} className="service-card__image" />
                  </div>
                  <h3 className="service-card__title">{card.title}</h3>
                  <p className="service-card__description">{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- BOOK VENUE SECTION ---------------- */}
          <section className="book-venue show" ref={bookVenueRef}>
            <h2 className="book-venue__title">Book Venue</h2>
            <div className="book-venue__cards">
              <div className="venue-card venue-card--blue" onClick={goToCreateEvent} style={{ cursor: "pointer" }}>
                <h3 className="venue-card__title">Create Event</h3>
                <p className="venue-card__subtitle">
                  Ready to make something begin. Create and submit a new event request with complete venue and schedule details.
                </p>
                <div className="venue-card__footer">
                  <span className="venue-card__action">create</span>
                  <span className="venue-card__icon">
                    <img src={Arrow} alt="arrow" />
                  </span>
                </div>
              </div>
              <div className="venue-card venue-card--white" onClick={goToPendingEvents} style={{ cursor: "pointer" }}>
                <h3 className="venue-card__title">Accepting / Pending</h3>
                <p className="venue-card__subtitle">
                  View events that are pending approval or already accepted.
                </p>
                <div className="venue-card__footer">
                  <span className="venue-card__action">view</span>
                  <span className="venue-card__icon">
                    <img src={Arrow} alt="arrow" />
                  </span>
                </div>
              </div>
              <div className="venue-card venue-card--white" onClick={() => navigate("/calendar-view")} style={{ cursor: "pointer" }}>
                <h3 className="venue-card__title">Calendar view</h3>
                <p className="venue-card__subtitle">
                  View your booked events in calendar format.
                </p>
                <div className="venue-card__footer">
                  <span className="venue-card__action">view</span>
                  <span className="venue-card__icon">
                    <img src={Arrow} alt="arrow" />
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- CONTACT SECTION ---------------- */}
          <section className="contact-page" ref={contactRef}>
            <div className="contact-container">
              <section className="contact-form-section">
                <div className="contact-form-wrapper">
                  <h1 className="contact-form__title">Contact Us</h1>
                  <p className="contact-form__subtitle">
                    Have questions, need assistance, or want to book a venue?
                  </p>
                  <form
                    className="contact-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const response = await fetch("http://localhost:5000/api/contact/submit", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(formData),
                        });
                        const data = await response.json();
                        if (!response.ok) throw new Error(data.message || "Submit failed");
                        alert("Message submitted successfully!");
                        setFormData({ firstName: "", lastName: "", email: "", message: "" });
                      } catch (err) {
                        alert(err.message);
                        console.error(err);
                      }
                    }}
                  >
                    <div className="form-group form-group--inline">
                      <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" placeholder="Enter Your Name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Enter Your Name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="6" placeholder="Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                  </form>
                </div>
              </section>

              <section className="contact-info-section">
                <div className="contact-info-column">
                  <article className="info-card info-card--blue">
                    <h3 className="info-card__title">Address</h3>
                    <p className="info-card__details">
                      Tirur NSS Office,<br />NSS College of Engineering,<br />Kuttipuram, Malappuram, Kerala - 679573
                    </p>
                  </article>
                  <article className="info-card">
                    <h3 className="info-card__title">Contact</h3>
                    <p className="info-card__details">+91 1234567890</p>
                  </article>
                  <article className="info-card">
                    <h3 className="info-card__title">Email</h3>
                    <p className="info-card__details">nssoffice@example.com</p>
                  </article>
                  <article className="info-card">
                    <h3 className="info-card__title">Working Hours</h3>
                    <p className="info-card__details">Mon - Fri: 9AM - 5PM</p>
                  </article>
                </div>
              </section>
            </div>
          </section>

          {/* ---------------- FOOTER ---------------- */}
               <footer className="footer">
          <div className="footer-container">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src={slotify} alt="Slotfy Logo" />
              </div>
              <p className="footer-description">
                A smart and simple platform to book college venues for events, meetings, and
                workshops. Easily check availability, reserve halls, and manage your event
                schedules in one place.
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Section</h4>
                <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Service</li>
                  <li>BookVenue</li>
                  <li>Contact</li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Socials</h4>
                <ul>
                  <li>Twitter</li>
                  <li>Instagram</li>
                  <li>Youtube</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

          {/* ---------------- MODALS ---------------- */}
         {/* ---------------- MODALS ---------------- */}
{/* ---------------- MODALS ---------------- */}
<Login
  show={showStudentLogin}
  onClose={() => setShowStudentLogin(false)}
  onLogin={(user) => {
    setUserData(user);
    setIsLoggedIn(true);
    setShowStudentLogin(false);
  }}
  onOpenSignUp={() => {
    setShowStudentLogin(false);
    setShowPrincipleLogin(true);
  }}
/>

<PrincipleLogin
  show={showPrincipleLogin}
  onClose={() => setShowPrincipleLogin(false)}
  onOpenLogin={() => {
    setShowPrincipleLogin(false);
    setShowStudentLogin(true);
  }}
  onLogin={(user) => {
    setUserData(user);
    setIsLoggedIn(true);
    setShowPrincipleLogin(false);
  }}
/>




        </div>
      </div>
    
  );
}

export default FinalProject;
