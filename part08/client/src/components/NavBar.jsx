import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ token }) => {
  console.log("🚀 ~ Navbar ~ token:", token)
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px",
    color: "white",
  };
  const linkStyle = {
    textDecoration: "none",
    color: "white",
    margin: "0 10px",
    fontWeight: "bold",
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div style={navbarStyle}>
      <Link style={linkStyle} to="/authors">
        Authors
      </Link>
      <Link style={linkStyle} to="/books">
        Books
      </Link>

      {!token ? (
        <Link style={linkStyle} to="/login">
          login
        </Link>
      ) : (
        <Link to="/" onClick={handleLogout}>
          Log Out
        </Link>
      )}

      {token && (
        <Link style={linkStyle} to="/add">
          Add Book
        </Link>
      )}
    </div>
  );
};

export default Navbar;
