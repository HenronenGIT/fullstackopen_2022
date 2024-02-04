import { useApolloClient } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setToken, token }) => {
  const client = useApolloClient();

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    window.location.reload();
    client.resetStore();
  };
  return (
    <div style={navbarStyle}>
      <Link style={linkStyle} to="/authors">
        Authors
      </Link>
      <Link style={linkStyle} to="/books">
        Books
      </Link>

      {token && (
        <Link style={linkStyle} to="/add">
          Add Book
        </Link>
      )}

      {!token ? (
        <Link style={linkStyle} to="/login">
          login
        </Link>
      ) : (
        <Link to="/" onClick={handleLogout}>
          Log Out
        </Link>
      )}
    </div>
  );
};

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

export default Navbar;
