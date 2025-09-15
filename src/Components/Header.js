// Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Header() {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));
        const events = snapshot.docs.map((doc) => doc.data());

        const uniqueCategories = [
          ...new Set(
            events
              .map((e) => e.category?.trim())
              .filter((cat) => cat && cat.length > 0)
          ),
        ];

        setCategories(
          uniqueCategories.length > 0
            ? uniqueCategories
            : ["Academic", "Cultural", "Sports"]
        );
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">EventPortal</div>

        {/* Desktop Navigation */}
        <nav className="navbar-links desktop-only">
          <Link to="/">Home</Link>
          <div className="dropdown">
            <button className="dropdown-toggle">Events ▾</button>
            <ul className="dropdown-menu">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link className="dropdown-item" to={`/events?category=${cat}`}>
                    {cat}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="dropdown-item" to="/events">
                  All Events
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/contact">Contact Us</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open Menu"
        >
          ☰
        </button>
      </div>

      
      
    </header>
  );
}

export default Header;

