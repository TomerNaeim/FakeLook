import GoogleLogin from "react-google-login";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";


const GOOGLE_CLIENT_ID =
  "378037402068-hnpf4gt6obl7o2nvdqf3fmfoc55u34qv.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GoogleLoginComp = (props) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleFailure = (result) => {
    alert(result.tokenId);
  };

  const handleLogin = async (temp) => {
    console.log(temp.tokenId);
    const res = await fetch(
      "http://localhost:5001/gogRouter/api/google-login",
      {
        method: "POST",
        body: JSON.stringify({
          token: temp.tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    const data = await res.json();
    setLoginData(data);
    console.log(data.email);
    localStorage.setItem("loginData", JSON.stringify(data));
    navigate('/')
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div>
      <h1>React Google Login App</h1>
      <div>
        {loginData ? (
          <div>
            <h3>You logged in as {loginData.email}</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        )}
      </div>
    </div>
  );
};
export default GoogleLoginComp;
