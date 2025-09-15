import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header"
import Footer from "./Components/Footer";

import HomePage from "./Pages/Homepage";
import EventsList from "./Pages/EventsList";
import RegisterForm from "./Pages/RegisterForm";
import SuccessPage from "./Pages/SuccessPage";
import Contact from "./Pages/ContactPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/register/:eventId" element={<RegisterForm />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
