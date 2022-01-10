import "regenerator-runtime/runtime";
import React from "react";
import "./global.css";

import Login from "./modules/auth/Login.jsx";
import OwnerCar from "./modules/owner-car";

export default function App() {
  if (!window.walletConnection.isSignedIn()) {
    return <Login />;
  }

  return <OwnerCar />;
}
