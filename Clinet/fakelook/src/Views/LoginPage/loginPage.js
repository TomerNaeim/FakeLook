import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/loginServ";

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
          .then((res) => alert(res.data.message));
        console.log(data);

        //navigate("/home");
      } catch (error) {}
    }

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
          <a href="http://localhost:5001/authGoogle/auth/google">
            {googleLogo}
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
