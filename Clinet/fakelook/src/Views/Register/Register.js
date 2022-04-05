import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/registerServ";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const validadte = () => {
    if (!email.includes("@", ".com")) {
      alert("invalid email");

      return false;
    }
    if (name.length < 4) {
      alert("invalid name you most minimum 4 letters   ");
      return false;
    }
    if (password.length < 6) {
      alert("invalid password you most minimum 6 letters ");
      return false;
    }
    return true;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validadte();
    if (isValid) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = api.post(
        "/signup",
        {
          name,
          email,
          password,
        },
        config
      );

      console.log("here from register");
      navigate("/login");
    }
  };
  return (
    <div>
      <h1> Register </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p> user name</p>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <p> Email</p>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <p>img</p>
          <input
            type="img"
            name="img"
            onChange={(e) => setImg(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
