import React from "react";
import { useState, useEffect } from "react";
import api from"../services/loginServ"

function loginPage() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (data) => {
    await api.post("/login", data).then((response) => {
    
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
  };
  return (
    <div className="login-wrapper">
      <h1> Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p> Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)} //*
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default loginPage;
