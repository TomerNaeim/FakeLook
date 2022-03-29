import React, { useState } from "react";
import postApi from "../services/postServ";
import userApi from "../services/userServ";
import { format } from "date-fns";

function Post(props) {
  const initialState = {
    tags: [],
    userUploaded: "",
    uploadedLocation: [],
    userRefrenses: [],
  };

  const [userUploaded, setUserUploaded] = useState();
  const [tags, setTags] = useState("");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((data) => {
      const { latitude, longitude } = data.coords;
      console.log(data.coords);
      this.props.myLocation.lat = latitude;
      this.props.myLocation.lng = longitude;
    });
  };

  const handleInputChange = (e) => {
    const datetime = format(new Date(), "dd/MM/yyy");
    let { name, value } = e.target;
    // setState({
    //   ...state,
    //   datetime,
    //   [name]: value,
    // });
  };
  const addPost = async () => {
    let loginData = localStorage.getItem("loginData");
    let res = JSON.parse(loginData);
    console.log(res);
    let user = await userApi.post("/getUserById", { id: res.id });
    let body = { id: user.id };
    console.log(body);
    await postApi.post("/addPost", { tags });
    console.log("jyiig");
  };
  const handleSubnit = async (e) => {
    e.preventDefault();
    // const datetime = format(new Date(), "dd/MM/yyy");
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    let loginData = localStorage.getItem("loginData");
    let res = JSON.parse(loginData);
    const userUploaded = res.id;
    console.log(userUploaded);
    const { data } = postApi.post(
      "/addPost",
      {
        tags,
        userUploaded,
      },
      config
    );

    // addPost();
  };

  return (
    <div>
      <form onSubmit={handleSubnit}>
        <label>tags:</label>
        <input
          type="text"
          name="tags"
          onChange={(e) => setTags(e.target.value)}
        />
        <label>refernce:</label>
        <input type="text" name="userRefrenses" onChange={handleInputChange} />

        <label> image</label>
        <input type="file" />
        <input type="submit" value="add" />
      </form>
    </div>
  );
}

export default Post;
