import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home-hero animate-zoom-in">
        <h1 className="hero-title">
          <span className="gradient-text">Discover & Promote</span> <br />
          <span className="hero-subtitle">Your Upcoming Events</span>
        </h1>
        <p className="hero-sub animate-fade-up">
          Welcome to <strong>EventPortal</strong> – your destination for 
          <strong> academic conferences</strong>, <strong>cultural fests</strong>, 
          and <strong>sports tournaments</strong>. <br /><br />
          Join a vibrant community of students, organizers, and enthusiasts. 
          Whether you want to attend, showcase, or manage events – we’ve got you covered.
        </p>
        <button className="btn animate-fade-up" onClick={() => navigate("/events")}>
          Explore Events
        </button>
      </section>

      {/* Featured Events */}
      <section className="slideshow animate-fade-up">
        <h2>🌟 Featured Events</h2>
        <div className="carousel">
          <div className="carousel-track">
            {events.concat(events).map(ev => (
              <div key={ev.id + Math.random()} className="slide-card">
                {ev.image && (
                  <img src={ev.image} alt={ev.title} className="slide-img" />
                )}
                <div className="slide-info">
                  <h3>{ev.title}</h3>
                  <p>{ev.description?.slice(0, 80)}...</p>
                  <button
                    className="btn"
                    onClick={() => navigate(`/register/${ev.id}`)}
                  >
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn more-events-btn" onClick={() => navigate("/events")}>
          View More Events →
        </button>
      </section>

   
    </div>
  );
}
