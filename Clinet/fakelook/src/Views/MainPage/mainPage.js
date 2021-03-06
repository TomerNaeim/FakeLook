import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Map from "./Componnets/map";

import "../MainPage/MainPage.css";
import SimpleMap from "./Componnets/map";

function MainPage() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [publishers, setPublishers] = useState("");
  const [imageTags, SetImageTags] = useState("");
  const [taggetUsers, SetTaggetUsers] = useState("");
  const [userInfo, setUserInfo] = useState({
    profile: JSON.parse(localStorage.getItem("loginData")),
  });

  const logOut = () => {
    if (localStorage.getItem("loginData")) {
      console.log("inside");
      localStorage.clear();
      navigate("/login");
    }
  };
  const onSearch = () => {
    let info = localStorage.getItem("searchData");

    if (info) {
      console.log(info);
      let temp = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        publisher: publishers,
        tags: imageTags,
        userTags: taggetUsers,
      };
      localStorage.setItem("searchData", JSON.stringify(temp));
    } else {
      let temp = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        publisher: publishers,
        tags: imageTags,
        userTags: taggetUsers,
      };
      localStorage.setItem("searchData", JSON.stringify(temp));
    }
  };

  const navigate = useNavigate();
  const postPage = async () => {
    navigate("/post");
  };
  const friendsPage = async () => {
    navigate("/MakeFriends");
  };
  return (
    <div className="body">
      <div></div>
      <div className="container">
        <div className="child1">
          child1
          <form>
            <button onClick={postPage}>create new post</button>
            <button onClick={friendsPage}>friends</button>
            <br />
            <label>date from</label>
            <input type="date" onChange={(e) => setDateFrom(e.target.value)} />
            <label>date to</label>
            <input type="date" onChange={(e) => setDateTo(e.target.value)} />
            <br />
            <label>publishers:</label>
            <input
              type="text"
              onChange={(e) => setPublishers(e.target.value)}
            />
            <label>image tags</label>
            <input type="text" onChange={(e) => SetImageTags(e.target.value)} />
            <br />
            {/* <label>tagget users</label>
            <input
              type="text"
              onChange={(e) => SetTaggetUsers(e.target.value)}
            /> */}
          </form>
          <button onClick={onSearch()}></button>
          <div>
            <h4>profile</h4>
            <div>name : {userInfo.profile.name}</div>
            <div>account Name : {userInfo.profile.email}</div>
            <h2>profile picture</h2>
            <img
              className="profilePic"
              src={userInfo.profile.picture}
              alt="image"
            ></img>
            <div>
              <button onClick={logOut}> LogOut Here.... </button>
            </div>
          </div>
        </div>
        <div className="child2">
          <SimpleMap></SimpleMap>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
