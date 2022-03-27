import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Login from "./Views/LoginPage/loginPage";
import Register from "./Views/Register/Register";
import MainPage from "./Views/MainPage/mainPage";
import Post from "./Views/Post/Post";
import MakeFriends from "./Views/MakeFriends/MakeFriends";

function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/MakeFriends" element={<MakeFriends />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
