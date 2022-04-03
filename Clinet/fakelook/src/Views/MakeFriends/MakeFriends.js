import React, { useState, useEffect } from "react";
import userApi from "../services/userServ";
import friendApi from "../services/friendServ";
import "../MakeFriends/MakeFriends.css";
import axios from "axios";

function MakeFriends() {
  const [userList, setUserList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState([]);
  const [friendssearch, setFriendssearch] = useState([]);
  let arr = [];
  let bodytwo;

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     console.log(localStorage.getItem("loginData"));
    //     const response = await userApi.get("/getAll");
    //     console.log(response);
    //     response.data.map((e) => {
    //       //   if(arr.includes(e.id))
    //       console.log(e);
    //     });
    //     setUserList(response.data);
    //   } catch (error) {
    //     if (error.response) {
    //       console.log(error.response.data);
    //     } else {
    //       console.log(`Error: ${error.message}`);
    //     }
    //   }
    // };

    const getFriends = async (data) => {
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
      arr.map((e) => console.log(e));

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
        // console.log(localStorage.getItem("loginData"));
        // let res = JSON.parse(loginData);
        //console.log(res);
        const response = await userApi.get("/getAll");
        console.log(response);

        setUserList(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };

    fetchUser();
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
  };

  return (
    <div className="container">
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
                <button onClick={() => addFriend(item._id)}></button>
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
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MakeFriends;
