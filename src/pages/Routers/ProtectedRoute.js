import React from 'react'
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {
    console.log('!!localStorage.getItem("userDetails")', localStorage.getItem("userDetails"));
  return !!localStorage.getItem("userDetails") ? children : <Navigate to="/" />;
}

export default ProtectedRoute