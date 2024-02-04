import React from "react";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from "@apollo/client";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import { Button } from "@mui/material";
import Navbar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  console.log("🚀 ~ App ~ token:", token);

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route
          path="/login"
          element={<LoginForm setError={setErrorMessage} setToken={setToken} />}
        />

        {/* <Route path="/login" element={<LoginForm setToken={setToken} />} /> */}
      </Routes>
    </>
  );
};

export default App;
