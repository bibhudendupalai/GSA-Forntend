import React from "react";
import { useState } from "react";
import "./login.css";
import Dashboard from "./dashboard";

const Loginform = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoogedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("username:", username);
    console.log("password:", password);
    setLoogedIn(true);
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }
  return (
    <div>
      <h2>Login form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Loginform;
