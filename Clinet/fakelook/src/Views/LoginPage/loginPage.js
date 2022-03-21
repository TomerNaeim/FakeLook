import { useState, useEffect } from "react";
import api from "../services/loginServ";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLogo, setGoogleLogo] = useState();

  const login = async (data) => {
    await api.post("/login", data).then((response) => {
      console.log(response);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await api.post(
        "/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.getItem("userInfo", JSON.stringify(data));
    } catch (error) {}

    console.log(email, password);
  };
  useEffect(async () => {
    let res = await api.get("http://localhost:5001/authLogoGoogle");
    console.log(res);
    setGoogleLogo(res.data.slice(9, 27));
  }, []);

  return (
    <div>
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
<<<<<<< HEAD
        <a href="http://localhost:5001/authGoogle/auth/google">{googleLogo}</a>
          
        
=======
          <a href="http://localhost:5001/authLogoGoogle">{googleLogo}</a>
>>>>>>> 6b7369707d4bc5f6ece9d3a32a00f68aa1cb34e1
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
