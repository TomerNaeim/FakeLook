<<<<<<< HEAD
import React, { Component,useEffect,useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useNavigate } from "react-router-dom";
import { Link, withRouter } from 'react-router-dom';
import './map.css'
import importPostsServices from './Services/importPostsService';
import ListOfPosts from './PostListComponnets/listOfPosts';


//import PostComp from './PostListComponnets/postComp';



const Post =({comp}) => <div>{comp}</div>
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const AnyReactComponentMyPlace = ({ text }) =><div className="myPlaceWrapper"> <div className="myPlace">{text} </div> </div>;
const YOUR_API_KEY = "AIzaSyDdqZA58veRQXLyB-DH1d5LN-iyKft5c9k"

const SimpleMap=()=> {
 const [center,setCenter] = useState({lat:32.46,lng:35.0055866});
 const [startZoom,setStartZoom] = useState(15);
 const [myLocation,setMyLoaction] = useState({lat:0,lng:0});
 const [profile,setProfile] = useState({});
 const [arrPosts,setArrPosts] = useState([]);
 const [firstLoad,setFirstLoad] = useState(true);
   

  useEffect(async ()=>{
      getLocation();
      console.log(myLocation);
      if(localStorage.getItem('loginData'))
    {
      //redirect to main menu with storage item
       console.log('have token');
       await getPostAll();
       console.log(arrPosts);
    }
    else
    {
    }
  },[firstLoad])

  
  
  const getPostAll = async()=>{
     let result = await importPostsServices();
     if (result=="Nothing Found")
     {
         window.alert('No Posts Were Found Try Again...')
     }
     else
     {
         console.log("inside making request");
         setArrPosts(result);
          setFirstLoad(true)
         //this.props.postArray.map((e)=>console.log(e));
     }
  }
  const getLocation=()=>{
    navigator.geolocation.getCurrentPosition (
        (data) => {
        const { latitude, longitude } = data.coords;
        console.log(data.coords);
        setMyLoaction({lat:latitude,lng:longitude})
      })}

     

      const makeMarkers = ()=>{
       return arrPosts.slice(2).map((marker, i) =>{
          console.log(marker);
         return <PostComp
         key={i}
         lat={marker.uploadedLocation[0]}
         lng={marker.uploadedLocation[1]}
         props = {marker}
         
         />
        }
        )
      }
  
 
  
=======
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const Post = ({ comp }) => <div>new postion</div>;
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const AnyReactComponentMyPlace = ({ text }) => <div>{text} </div>;
const YOUR_API_KEY = "AIzaSyDdqZA58veRQXLyB-DH1d5LN-iyKft5c9k";
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 32.4680035,
      lng: 35.0055866,
    },
    zoom: 15,
    myLocation: {
      lat: 0,
      lng: 0,
    },
    profile: {
      name: "tomer",
    },
  };

  componentDidMount() {
    this.getLocation();
    console.log(this.props.myLocation);
  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((data) => {
      const { latitude, longitude } = data.coords;
      console.log(data.coords);
      this.props.myLocation.lat = latitude;
      this.props.myLocation.lng = longitude;

      //this.props({lat:latitude,lng: longitude });
    });
  };

  render() {
>>>>>>> cff723b9dd2a9df1817d51f4cd7ed1eb3646c792
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
<<<<<<< HEAD
          bootstrapURLKeys={{ key: YOUR_API_KEY}}
          defaultCenter={center}
          defaultZoom={startZoom}
        >
          
          {/* {arrPosts.slice(2).map((marker, i) =>{
              return(<PostComp
                  key={i}
                  lat={marker.uploadedLocation[0]}
                  lng={marker.uploadedLocation[1]}
                  img_src={marker.picture}
                  // onChildClick={this.markerClicked.bind(this, marker)}
                />

              )
            })}      */}
         
           {/* <ListOfPosts  list = {arrPosts}></ListOfPosts> */}
           {makeMarkers()}
            <AnyReactComponentMyPlace
            lat={myLocation.lat}
            lng={myLocation.lng}
=======
          bootstrapURLKeys={{ key: YOUR_API_KEY }}
          defaultCenter={this.props.myLocation}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponentMyPlace
            lat={this.props.myLocation.lat}
            lng={this.props.myLocation.lng}
>>>>>>> cff723b9dd2a9df1817d51f4cd7ed1eb3646c792
            text="My Position"
          />
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }

  const PostComp = ({props})=>{
    const [postModel,setPostModel] = useState(props)
    const [tags,setTags] = useState(props.tags);
    const [userUploaded,setUserUploaded] = useState(props.userUploaded);
    const [userLoaction,setUserLoaction] = useState(props.userLoaction);
    const [dateUploaded,setDateUploaded] = useState(props.dateUploaded);
    const [userRefrenses,setUserRefrenses] = useState(props.userRefrenses);
    const [userPicture,setUserPicture] = useState(props.picture);
    const [postLikes,setPostLikes] = useState(props.postLikes);
    const [postComments,setPostComments] = useState(props.postComments);
    const [lng,setLng] = useState(props.uploadedLocation[1]);
    const [lat,setLat] = useState(props.uploadedLocation[0]);
    const navigate = useNavigate();
    const markerClicked=()=>{
      
      navigate('/PostCompEditView',{state:{model:postModel}});
    }
   
   const makeSomething=()=>{
      console.log(userPicture);
    }
  
  
  return(

    <div>
          {makeSomething()}
    <div>
      {userUploaded} 
      
    </div>
    <img className='img' src={userPicture} alt="image" />
     <button onClick={markerClicked}></button>
   
    </div>
  )}
  


export default SimpleMap;
