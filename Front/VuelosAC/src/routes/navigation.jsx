import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FlightSearch from "../pages/FlightSearch";

export default function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<FlightSearch />} />
      </Routes>
    </Router>
  );
}
