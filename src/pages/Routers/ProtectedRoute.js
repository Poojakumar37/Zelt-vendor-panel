import React from 'react'
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  console.log('!!localStorage.getItem("vendorDetails")', localStorage.getItem("vendorDetails"));
  return !!localStorage.getItem("vendorDetails") ? children : <Navigate to="/" />;
}

export default ProtectedRoute