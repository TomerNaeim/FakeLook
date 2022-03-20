import { Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./Views/LoginPage/loginPage";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
