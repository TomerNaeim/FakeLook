import React, { Component,useEffect,useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useNavigate } from "react-router-dom";
import { Link, withRouter } from 'react-router-dom';
import './map.css'
import importPostsServices from './Services/importPostsService';
import ListOfPosts from './PostListComponnets/listOfPosts';
import getNameForUserService from './Services/getNameForUserService';
import makeSearchRequest from './Services/makeSearchRequest';
import getFriendPostService from './Services/getFriendPostService';


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
 const [searchParameters,setSearchParameters] = useState({});
   

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

  const refresh = async ()=>{
    let searchData = localStorage.getItem('searchData');
    let search =  JSON.parse(searchData);
    console.log(search);
    console.log(arrPosts);
    console.log(search.publisher);
    let res = await makeSearchRequest(search.dateFrom,search.dateTo,search.publisher,search.tags,search.userTags,arrPosts)
    console.log(res);
    let arr= [];
    arr = res.map((e)=>{
      if(e != null)
      {
        return e;
      }
    })
    setArrPosts(arr)


  }
  const restartPosts = async()=>{

  }

  const getFriendPost = async ()=>{
    let loginData = localStorage.getItem('loginData');
    let data =  JSON.parse(loginData);
    let res = await getFriendPostService(data.id);
    if(res != "Nothing Found")
    setArrPosts(res)
    else{
      window.alert("no posts by Friend Found")
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
       return arrPosts.slice(0).map((marker, i) =>{
         if(marker != null){

        if(marker.uploadedLocation[0] != null)  
        {console.log(marker.uploadedLocation);
         return <PostComp
         key={i}
         lat={marker.uploadedLocation[0]}
         lng={marker.uploadedLocation[1]}
         props = {marker}
         
         />}}
        }
        )
      }
  
 
  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <button onClick={refresh}>Apply Search</button>
        <button onClick={getFriendPost}>Show Only Friends</button>
        <button onClick={getPostAll}>Show All Posts</button>
        <GoogleMapReact
          bootstrapURLKeys={{ key: YOUR_API_KEY}}
          defaultCenter={center}
          defaultZoom={startZoom}
        >
          
          
           {makeMarkers()}
            <AnyReactComponentMyPlace
            lat={myLocation.lat}
            lng={myLocation.lng}
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
    const [userPostModel,setUserPostModel] = useState({})
    const navigate = useNavigate();
    const markerClicked=()=>{
      
      navigate('/PostCompEditView',{state:{model:postModel}});
    }
   
   
    useEffect(async ()=>{
      let data = await getNameForUserService(userUploaded)
      setUserPostModel(data);
    },[])
  
  
  return(

    <div>
          
    <div>
      {userPostModel.userName} <label>likes: {postModel.postLikes}</label>
      
    </div>
    <img className='img' src={userPicture} alt="image" />
     <button onClick={markerClicked}>enter post</button>
   
    </div>
  )}
  


export default SimpleMap;
