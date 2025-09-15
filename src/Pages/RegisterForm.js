// src/components/RegisterForm.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../Components/Spinner";

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function RegisterForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    let mounted = true;
    async function fetchEvent() {
      try {
        const docRef = doc(db, "events", eventId);
        const snap = await getDoc(docRef);
        if (snap.exists() && mounted) {
          setEvent({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error("Error loading event:", err);
      } finally {
        if (mounted) setLoadingEvent(false);
      }
    }
    fetchEvent();
    return () => {
      mounted = false;
    };
  }, [eventId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleReset = () => {
    setForm({ name: "", email: "", phone: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(form.email)) {
      alert("Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        eventId,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        timestamp: serverTimestamp(),
      });

      localStorage.setItem("lastRegistrationId", docRef.id);

      // clear form automatically after submission
      setForm({ name: "", email: "", phone: "" });
      navigate("/success");
    } catch (err) {
      console.error("Registration error:", err);
      alert("An error occurred while registering. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingEvent)
    return (
      <div className="container center">
        <Spinner size={40} />
      </div>
    );

  if (!event)
    return (
      <div className="container">
        <p>❌ Event not found.</p>
      </div>
    );

  return (
    <div className="container max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-2">
        Register for: <span className="text-indigo-600">{event.title}</span>
      </h2>
      <p className="text-gray-500 mb-6">
        📅 Date:{" "}
        {event.date
          ? event.date.seconds
            ? new Date(event.date.seconds * 1000).toLocaleDateString()
            : new Date(event.date).toLocaleDateString()
          : "TBA"}
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            required
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button className="btn w-full" type="submit" disabled={submitting}>
            {submitting ? "Registering..." : "Submit Registration"}
          </button>
          <button
            type="button"
            className="btn btn-secondary w-full"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
