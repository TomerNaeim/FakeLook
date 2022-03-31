import React, { useState, useEffect } from "react";
import userApi from "../services/userServ";
import friendApi from "../services/friendServ";
import axios from "axios";

function MakeFriends() {
  const [userList, setUserList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(localStorage.getItem("loginData"));
        const response = await userApi.get("/getAll");
        setUserList(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };

    const getFriends = async (data) => {
      console.log("herhe");
      let loginData = localStorage.getItem("loginData");
      let res = JSON.parse(loginData);
      console.log(res);
      let user = await axios.post("http://localhost:5000/user/getUserById", {
        id: res.id,
      });
      console.log(user.data.friendsCollectionFK);
      let body = { id: user.data.friendsCollectionFK };
      let friends = await friendApi.post("/getById", body);
      //console.log(friends.data.friendsCollection[0]);
      let bodytwo = friends.data.friendsCollection;
      console.log(bodytwo);
      // let newarr = bodytwo.map(async (e) => {
      //   let users = await axios.post("http://localhost:5000/user/getUserById", {
      //     e,
      //   });
      //   console.log(users);
      // });
      for (let index = 0; index < bodytwo.length; index++) {
        const element = bodytwo[index];
        let body = { id: ` ${element}` };
        let users = await axios.post(
          "http://localhost:5000/user/getUserById",
          element
        );

        console.log(users);
      }

      //console.log(users);
      setFriendList(friends.data.friendsCollection);
    };
    getFriends();
    fetchUser();
  }, []);

  const getFriends = async (data) => {
    console.log("herhe");
    let loginData = localStorage.getItem("loginData");
    let res = JSON.parse(loginData);
    console.log(res);
    let user = await axios.post("http://localhost:5000/user/getUserById", {
      id: res.id,
    });
    console.log(user.data.friendsCollectionFK);
    let body = { id: user.data.friendsCollectionFK };
    let friends = await friendApi.post("/getById", body);
    console.log(friends);
  };

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
  };

  return (
    <div>
      <div>
        {userList.map((item, index) => {
          return (
            <div>
              <h4>name: {item.userName}</h4>
              <h4>email: {item.emailAdress}</h4>
              <button onClick={() => addFriend(item._id)}></button>
            </div>
          );
        })}
      </div>

      <div>
        {friendList.map((item, index) => {
          return (
            <div>
              <h4>name: {item.userName}</h4>
              <h4>email: {item.emailAdress}</h4>
              <button onClick={() => addFriend(item._id)}></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MakeFriends;
