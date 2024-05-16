import React from "react";
import { useState } from "react";
import "./login.css";
import Dashboard from "./dashboard";

const Loginform = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoogedIn] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
    console.log("username:", username);
    console.log("password:", password);

    const raw = JSON.stringify({
      "username": username,
      "password": password
    });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try{
      const res = await fetch("http://127.0.0.1:8000/login/", requestOptions)
      const data= await res.json()
      console.log(data)
      await localStorage.setItem('token',data.token)
      setLoogedIn(true);
    }
    catch(err){
      alert(err)
    }
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
          {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Loginform;
