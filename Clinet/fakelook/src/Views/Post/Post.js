import React, { useState, useEffect } from "react";
import postApi from "../services/postServ";
import userApi from "../services/userServ";
import Select from "react-select";
import MultiSelect from "react-multiple-select-dropdown-lite";
import { format } from "date-fns";

function Post() {
  const [picture, setPicture] = useState("");
  const [uploadedLocation, setUploadedLocation] = useState({});
  const [tags, setTags] = useState("");
  //const [postLikes, setPostLikes] = useState(0);
  const [flag, setFlag] = useState(false);
  const [list, setList] = useState([]);
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
      // console.log(data.coords);
      setFlag(true);
    });
  };

  const handleSubnit = async (e) => {
    e.preventDefault();
    const datetime = format(new Date(), "dd/MM/yyy");
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    console.log(uploadedLocation);
    //setUploadedLocation(cords);
    //console.log(uploadedLocation);
    let loginData = localStorage.getItem("loginData");
    let res = JSON.parse(loginData);
    const userUploaded = res.id;
    console.log(userUploaded);
    let body = {
      tags: tags,
      uploadedLocation: arr,
      userUploaded: userUploaded,
      dateUploaded: datetime,
      picture: picture,
      userRefrenses: [],
      postLikes: 0,
      postComments: [],
    };
    let arr = [uploadedLocation.longitude, uploadedLocation.latitude];
    const { data } = postApi.post("/addPost", body, config);

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
        <label>picture:</label>
        <input
          type="text"
          name="picture"
          onChange={(e) => setPicture(e.target.value)}
        />

        <select>
          {list.map((person) => (
            <option>{person.userName}</option>
          ))}
        </select>

        <label> image</label>
        <input type="file" />
        <input type="submit" value="add" />
      </form>
      {/* <div>
        {flag}:
        {uploadedLocation.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </div> */}
      <div>{uploadedLocation.longitude}</div>
    </div>
  );
}

export default Post;
