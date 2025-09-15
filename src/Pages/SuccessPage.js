import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    const fetchRegistration = async () => {
      const id = localStorage.getItem("lastRegistrationId");
      if (!id) return;
      try {
        const snap = await getDoc(doc(db, "registrations", id));
        if (snap.exists()) {
          setRegistration(snap.data());
        }
      } catch (err) {
        console.error("Error fetching registration details:", err);
      }
    };
    fetchRegistration();
  }, []);

  return (
    <div className="container max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">✅ Registration Successful</h2>
      <p className="text-gray-600 mb-6">
        Thank you for registering! 🎉 We look forward to seeing you at the event.
      </p>

      <div className="flex gap-3 justify-center mb-6">
        <button className="btn w-full" onClick={() => navigate("/events")}>
          Back to Events
        </button>
        <button className="btn btn-secondary w-full" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>

      {registration && (
        <div className="registration-details text-left">
          <h3 className="text-lg font-semibold mb-2">Your Registration Details</h3>
          <p>
            <strong>Event ID:</strong> {registration.eventId}
          </p>
          <p>
            <strong>Name:</strong> {registration.name}
          </p>
          <p>
            <strong>Email:</strong> {registration.email}
          </p>
          <p>
            <strong>Phone:</strong> {registration.phone}
          </p>
          <p>
            <strong>Registered On:</strong>{" "}
            {registration.timestamp?.toDate().toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
