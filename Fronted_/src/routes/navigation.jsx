import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ROUTES PROTECTORS
import IsAuthenticated from "./isAuthenticated";
import ProtectedRoutes from "./protectedRoutes";

// VIEWS - COMPONENTS
import LoginPage from "../pages/loginPage";
import DashBoard from "../pages/dashBoard";

export default function Navigation() {
  return (
    <Router>
      <Routes>
        {/* When you are Authenticated you can't enter in the login page */}
        <Route element={<IsAuthenticated />}>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </Router>
  );
}
