import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/registerServ";
const Register = () => {
  //  const initialState = {
  //    name: "",
  //    email: "",
  //    password: "",
  //  };
  //  const [user, setUser] = useState(initialState);
  //
  //  const handlechange = (e) => {
  //    const { name, value } = e.target;
  //    setUser({
  //      ...user,
  //      [name]: value,
  //    });
  //  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await api.post(
        "/signup",
        {
          name,
          email,
          password,
        },
        config
      );
      localStorage.getItem("userInfo", JSON.stringify(data));
    } catch (error) {}

    // console.log(email, password);
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
