import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand/About */}
        <div className="footer-about">
          <h3>EventPortal</h3>
          <p>
            Discover, promote, and register for academic, cultural, and sports
            events effortlessly. Join our vibrant community today!
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: info@eventportal.com</p>
          <p>Phone: +91 12345 67890</p>
          <div className="footer-social">
            <a href="#">🌐 Facebook</a>
            <a href="#">🐦 Twitter</a>
            <a href="#">📸 Instagram</a>
            <a href="#">💼 LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} EventPortal. All Rights Reserved.
      </div>
    </footer>
  );
}
