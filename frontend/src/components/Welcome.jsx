import React from "react";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      Welcome to Notes
      <NavLink to="/signup">
        <button>Sign Up</button>
      </NavLink>
      <NavLink to="/login">
        <button>Log In</button>
    </NavLink>
    </div>
  );
};

export default Welcome;
