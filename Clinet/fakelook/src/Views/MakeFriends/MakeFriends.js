import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../services/userServ";
import friendApi from "../services/friendServ";
import groupApi from "../services/friendGoupServ";
import "../MakeFriends/MakeFriends.css";

import axios from "axios";

function MakeFriends() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [disable, setDisable] = useState(false);
  const [search, setSearch] = useState([]);
  const [friendssearch, setFriendssearch] = useState([]);
  let arr = [];
  let arry = [];
  let bodytwo;
  let loginData = localStorage.getItem("loginData");
  let res = JSON.parse(loginData);
  useEffect(() => {
    const getFriends = async (data) => {
      // let loginData = localStorage.getItem("loginData");
      //let res = JSON.parse(loginData);
      console.log(res);
      let user = await axios.post("http://localhost:5000/user/getUserById", {
        id: res.id,
      });
      console.log(user.data.friendsCollectionFK);
      let body = { id: user.data.friendsCollectionFK };
      let friends = await friendApi.post("/getById", body);
      console.log(friends);
      //console.log(friends.data.friendsCollection[0]);
      bodytwo = friends.data.friendsCollection;
      console.log(bodytwo);
      //let arr = [];

      for (let index = 0; index < bodytwo.length; index++) {
        const element = bodytwo[index];
        let body = { id: element };
        let users = await axios.post(
          "http://localhost:5000/user/getUserById",
          body
        );

        if (users != null) arr.push(users.data);
      }
      // arr.map((e) => console.log(e));

      let uniqueObjArray = [
        ...new Map(arr.map((item) => [item["_id"], item])).values(),
      ];
      console.log(uniqueObjArray);
      const newSet = [...new Set(arr)];
      console.log(newSet);
      setFriendList(uniqueObjArray);
    };

    const fetchUser = async () => {
      try {
        const response = await userApi.get("/getAll");
        console.log(response.data);

        setUserList(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };
    const getAll = async () => {
      const response = await groupApi.get("/getAll");
      console.log("hy");
      console.log(response.data);
      let body = response.data;
      for (let index = 0; index < body.length; index++) {
        const elements = body[index];
        console.log(elements.friendsGroup);
        let secendBody = elements.friendsGroup;

        let bod = { id: elements };
        for (let index = 0; index < secendBody.length; index++) {
          const element = secendBody[index];
          console.log(element);
          if (res.id == element) {
            setDisable(true);
          }
        }

        let group = await groupApi.post("/getById", bod);

        if (group != null) arry.push(group.data);
      }
      console.log(arry._id);
      setGroupList(arry);
    };

    fetchUser();
    getAll();
    getFriends();
  }, []);

  const addFriend = async (data) => {
    let loginData = localStorage.getItem("loginData");
    let res = JSON.parse(loginData);
    console.log(res);

    let user = await axios.post("http://localhost:5000/user/getUserById", {
      id: res.id,
    });

    console.log(user.data.friendsCollectionFK);
    let body = { id: user.data.friendsCollectionFK, friend: data };
    await friendApi.post("/addToList", body);
    window.location.reload();
  };

  const deleteFriends = async (data) => {
    let user = await axios.post("http://localhost:5000/user/getUserById", {
      id: res.id,
    });

    console.log(user.data.friendsCollectionFK);
    console.log(data);
    let body = { id: user.data.friendsCollectionFK, friend: data };
    await friendApi.post("/remove", body);
    window.location.reload();
  };

  const addGroup = async (data) => {
    let loginData = localStorage.getItem("loginData");
    let res = JSON.parse(loginData);
    console.log(res);
    let user = await axios.post("http://localhost:5000/user/getUserById", {
      id: res.id,
    });
    console.log(user.data._id);
    let body = { id: data, user: user.data._id };
    console.log(body);
    await groupApi.post("/addToList", body);
    window.location.reload();
  };

  return (
    <div className="containers">
      <div>
        <label>add new friends</label>
        <input
          type="text"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="find some one"
        />
        {userList
          .filter((item) => {
            if (search == "") {
              return item;
            } else if (
              item.userName.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item, index) => {
            return (
              <div key={index}>
                <h4>name: {item.userName}</h4>
                <h4>email: {item.emailAdress}</h4>
                <button onClick={() => addFriend(item._id)}>add</button>
              </div>
            );
          })}
      </div>

      <div className="chaild">
        <label>your friends</label>
        <input
          type="text"
          onChange={(event) => {
            setFriendssearch(event.target.value);
          }}
          placeholder="find some one"
        />
        {friendList
          .filter((item) => {
            if (friendssearch == "") {
              return item;
            } else if (
              item.userName.toLowerCase().includes(friendssearch.toLowerCase())
            ) {
              return item;
            }
          })

          .map((item, index) => {
            return (
              <div key={index}>
                <h4>name: {item.userName}</h4>
                <h4>email: {item.emailAdress}</h4>
                <button onClick={() => deleteFriends(item._id)}>remove</button>
              </div>
            );
          })}
      </div>

      <div className="chaild">
        <label>groups</label>
        {groupList.map((item, index) => {
          return (
            <div key={index}>
              <h4>group name: {item.groupName}</h4>
              <button disabled={disable} onClick={() => addGroup(item._id)}>
                add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MakeFriends;
