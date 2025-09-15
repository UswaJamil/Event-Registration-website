import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useLocation } from "react-router-dom";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get query param (category)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        let eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ Filter by category safely
        if (category) {
          eventsData = eventsData.filter(
            (event) =>
              event.category &&
              event.category.trim().toLowerCase() === category.trim().toLowerCase()
          );
        }

        setEvents(eventsData);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [category]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading events...</p>;

  return (
    <div className="events-page">
      <h2 className="events-title">
        {category ? `${category} Events` : "Upcoming Events"}
      </h2>
      <div className="events-container">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img
              src={event.image || "https://via.placeholder.com/400x200"}
              alt={event.title}
              className="event-image"
            />
            <div className="event-content">
              <div className="event-category">{event.category}</div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-date">📅 {event.date}</p>
              <p className="event-location">📍 {event.location}</p>
              <p className="event-description">{event.description}</p>
              <Link to={`/register/${event.id}`} className="btn">
                Register
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsList;
