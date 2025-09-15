import React from "react";

export default function Contact() {
  return (
    <div className="contact-page" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Contact Us</h2>
      <p style={{ marginBottom: "10px" }}>
        📧 <strong>Email:</strong> info@eventportal.com
      </p>
      <p style={{ marginBottom: "10px" }}>
        ☎️ <strong>Phone:</strong> +91 12345 67890
      </p>
      <p>
        We’d love to hear from you! Please reach out with any questions,
        suggestions, or collaboration opportunities.
      </p>
    </div>
  );
}
