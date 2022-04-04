import React, { useState } from "react";
import api from "../services/friendGoupServ";

function PostNewGroup() {
  const [groupName, setGroupName] = useState("");
  const handleSubnit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    let body = {
      groupName: groupName,
    };
    const { data } = api.post("/addGroupFriend", body, config);
  };
  return (
    <div>
      <form onSubmit={handleSubnit}>
        <label>group name:</label>
        <input
          type="text"
          name="groupName"
          onChange={(e) => setGroupName(e.target.value)}
        />
        <input type="submit" value="add" />
      </form>
    </div>
  );
}

export default PostNewGroup;
