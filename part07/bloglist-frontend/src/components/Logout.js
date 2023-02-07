import React from "react";

const Logout = ({ username, handleLogout }) => {
  return (
    <div>
      {username} logged in
      <button id="logout" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};
export default Logout;
