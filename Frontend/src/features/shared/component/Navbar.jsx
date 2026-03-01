import React from "react";
import "../navbar.scss";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <p>Instgram</p>
      <button
        onClick={() => {
          navigate("/createpost");
        }}
        className="button primary-btn"
      >
        Create Post
      </button>
    </nav>
  );
};

export default Navbar;
