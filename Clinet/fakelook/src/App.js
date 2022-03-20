import {  BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import React from "react";
import Login from "./Views/LoginPage/loginPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
      
      </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
