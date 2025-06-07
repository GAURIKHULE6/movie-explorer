import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Pages/Home";
import ActorDetails from "./Pages/ActorDetails";
import MovieDetails from "./Pages/MovieDetails";
import Favorites from "./Pages/Favorites";
// import ActorProfile from "./Pages/ActorProfile"; // You can remove if duplicate of ActorDetails
// import DarkModeToggle from "./components/DarkModeToggle"; // Not used in this version

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true" || false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="app">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            padding: "8px 12px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/actor/:id" element={<ActorDetails />} />
          {/* Remove duplicate actor route or rename path if ActorProfile is different */}
          {/* <Route path="/actor/:id" element={<ActorProfile />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
