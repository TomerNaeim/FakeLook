import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import React from "react";
import Login from "./Views/LoginPage/loginPage";
import Register from "./Views/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/r" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
