import React, { useState } from "react";
import postApi from "../services/postServ";
import userApi from "../services/userServ";
import axios from "axios";
import { components } from "react-select";
import Select from "react-select";

function Post(props) {
  // const initialState = {
  //   tags: "",
  //   userUploaded: "",
  //   uploadedLocation: "",
  //   userRefrenses: [],
  // };

  const [tags, setTags] = useState([]);

  const addPost = async (data) => {
    let loginData = localStorage.getItem("loginData");
    let res = JSON.parse(loginData);
    console.log(res);
    let user = await userApi.post("/getUserById", { id: res.id });
    let body = { id: user.data.id, tags };
    await postApi.post("/addPost", body);
  };

  return (
    <div>
      <form>
        <label>tags:</label>
        <input
          type="text"
          name="tags"
          onChange={(e) => setTags(e.target.value)}
        />
        <label> image</label>
        <input type="file" />
      </form>
    </div>
  );
}

export default Post;
