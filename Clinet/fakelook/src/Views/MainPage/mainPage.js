import React from "react";

function mainPage(props) {
  return <div>mainPage {localStorage.getItem('loginData')}</div>;
}

export default mainPage;
