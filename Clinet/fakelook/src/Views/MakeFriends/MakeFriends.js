import React, { useState, useEffect } from "react";
import userApi from "../services/userServ";
import friendApi from "../services/friendServ";
function MakeFriends() {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
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
    fetchUser();
  }, []);
  const addFriend = async (data) => {
    console.log(data);
    await friendApi.post("/addFriend", data);
    setUser({ data });
  };

  return (
    <div>
      {userList.map((item, index) => {
        return (
          <div>
            <h4>name: {item.userName}</h4>
            <h4>email: {item.emailAdress}</h4>
            <button onClick={() => addFriend(item)}></button>
          </div>
        );
      })}
    </div>
  );
}

export default MakeFriends;
