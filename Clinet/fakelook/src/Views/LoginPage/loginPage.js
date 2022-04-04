import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/loginServ";
import GoogleLoginComp from "./Componnets/googleLogin";
import FacebookLogin from "./Componnets/facebookLogin";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLogo, setGoogleLogo] = useState();

  // const login = async (data) => {
  //   await api.post("/login", data).then((response) => {
  //     console.log(response);
  //   });
  // };

  const validadte = () => {
    if (!email.includes("@", ".com")) {
      alert("invalid email");

      return false;
    }
    if (password.length < 6) {
      alert("invalid password you most minimum 6 letters   ");
      return false;
    }
    return true;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validadte();
    if (isValid) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = api
          .post(
            "/login",
            {
              email,
              password,
            },
            config
          )
          .then((res) => {
            
            localStorage.setItem("loginData", JSON.stringify(res.data));
            navigate("/");
          });

        console.log(data);

        
      } catch (error) {}
    }

    console.log(email, password);
  };
  useEffect(() => {
    console.log(localStorage.getItem("loginData"));
    if (localStorage.getItem("loginData")) {
      //redirect to main menu with storage item
      console.log("have token");
      navigate("/");
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
