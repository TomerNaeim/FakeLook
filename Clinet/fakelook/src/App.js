import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Login from "./Views/LoginPage/loginPage";
import Register from "./Views/Register/Register";
import MainPage from "./Views/MainPage/mainPage";
import Post from "./Views/Post/Post";
import MakeFriends from "./Views/MakeFriends/MakeFriends";
import PostCompEditView from "./Views/MainPage/Componnets/PostListComponnets/postComp";

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
        <Route
          path="/PostCompEditView"
          element={<PostCompEditView></PostCompEditView>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
