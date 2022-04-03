import React, { useState, useEffect } from "react";
import postApi from "../services/postServ";
import userApi from "../services/userServ";
import Select from "react-select";
import { format } from "date-fns";

function Post() {
  const [picture, setPicture] = useState("");
  const [uploadedLocation, setUploadedLocation] = useState({});
  const [tags, setTags] = useState("");
  const [flag, setFlag] = useState(false);
  const [list, setList] = useState([]);
  const [userRefrenses, setUserRefrenses] = useState([]);
  let loginData = localStorage.getItem("loginData");
  let res = JSON.parse(loginData);
  useEffect(async () => {
    const response = await userApi.get("/getAll");
    setList(response.data);
    getLocation();
  }, []);

  const getLocation = () => {
    let temp;
    navigator.geolocation.getCurrentPosition((data) => {
      const { latitude, longitude } = data.coords;
      temp = data.coords;
      console.log(latitude, longitude);
      setUploadedLocation({
        latitude: latitude,
        longitude: longitude,
      });
      setFlag(true);
    });
  };

  const handleSubnit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const datetime = format(new Date(), "dd/MM/yyy");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log(userRefrenses);

      console.log(uploadedLocation);
      // let loginData = localStorage.getItem("loginData");
      // let res = JSON.parse(loginData);
      const userUploaded = res.id;
      console.log(userUploaded);
      let tempa = {
        name: userRefrenses,
      };
      let user = await userApi.post("/findone", tempa, config);
      if (user == "not found") {
        console.log("inside");
      } else {
        console.log(user.data);
        let userRefrense = user.data;
        console.log(userRefrense);

        let arr = [uploadedLocation.latitude, uploadedLocation.longitude];
        let body = {
          tags: tags,
          uploadedLocation: arr,
          userUploaded: userUploaded,
          dateUploaded: datetime,
          picture: picture,
          userRefrenses: userRefrense,
          postLikes: 0,
          postComments: [],
        };
        console.log(userRefrenses);

        const { data } = postApi.post("/addPost", body, config);
        console.log("finish");
      }
    } else {
      console.log("ffffffff");
    }
  };

  const validate = () => {
    if (picture.length < 2) {
      alert(" you most pot picture");
      return false;
    }
    if (uploadedLocation.length < 1) {
      alert(" you most pot picture");
      return false;
    }

    return true;
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
        <label>picture:</label>
        <input
          type="text"
          name="picture"
          onChange={(e) => setPicture(e.target.value)}
          placeholder="put some url of picture"
        />

        <label>User Refrenses:</label>
        <input
          type="text"
          name="UserRefrenses"
          onChange={(e) => setUserRefrenses(e.target.value)}
          placeholder="write some one you wont refrence on your post"
        />

        <input type="submit" value="add" />
      </form>

      <div></div>
    </div>
  );
}

export default Post;
