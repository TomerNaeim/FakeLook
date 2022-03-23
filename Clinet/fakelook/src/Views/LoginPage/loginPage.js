import { useState, useEffect } from "react";
import api from "../services/loginServ";
import GoogleLoginComp from "./Componnets/googleLogin";
import FacebookLogin from "./Componnets/facebookLogin"

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
  useEffect(() =>{
    console.log(localStorage.getItem('loginData'));
    if(localStorage.getItem('loginData'))
    {
      //redirect to main menu with storage item
       console.log('have token');
    }
   
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
        {/* <a href="http://localhost:5001/authGoogle/auth/google">{googleLogo}</a> */}
          <GoogleLoginComp></GoogleLoginComp>
          <FacebookLogin></FacebookLogin>
        
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
