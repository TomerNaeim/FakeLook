import React, { useEffect, useState } from "react";
import api from "../services/friendGoupServ";

function groupFriends() {
  const getGroup = async () => {
    let group = await api.get("/getAll");
    console.log(group);
  };
  getGroup();

  return (
    <div>
      <p>hlllw</p>
    </div>
  );
}

export default groupFriends;
