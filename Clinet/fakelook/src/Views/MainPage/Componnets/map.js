import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { useNavigate } from "react-router-dom";
import { Link, withRouter } from 'react-router-dom';
import './map.css'
import importPostsServices from './Services/importPostsService';


const Post =({comp}) => <div>new postion</div>
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const AnyReactComponentMyPlace = ({ text }) =><div className="myPlaceWrapper"> <div className="myPlace">{text} </div> </div>;
const YOUR_API_KEY = "AIzaSyDdqZA58veRQXLyB-DH1d5LN-iyKft5c9k"

class SimpleMap extends Component {
 
   
  static defaultProps = {
    center: {
      lat: 32.4680035,
      lng: 35.0055866
    },
    zoom: 15,
    myLocation:{
        lat: 0,
        lng: 0
    },
    profile:
    {
        name: "tomer"
    },
    postArray :{
        allPosts:{}

    }
   
  };

  async componentDidMount() {

      this.getLocation();
      console.log(this.props.myLocation);
      if(localStorage.getItem('loginData'))
    {
      //redirect to main menu with storage item
       console.log('have token');
      await this.getPostAll();
      
    }
    else
    {
        

    }
  }
 getPostAll = async()=>{
     let result = await importPostsServices();
     if (result=="Nothing Found")
     {
         window.alert('No Posts Were Found Try Again...')
     }
     else
     {
         console.log(result[2]);
         this.props.postArray.allPosts = result[2];
         //this.props.postArray.map((e)=>console.log(e));
     }
     

  }
 getLocation=()=>{
    navigator.geolocation.getCurrentPosition (
        (data) => {
        const { latitude, longitude } = data.coords;
        console.log(data.coords);
        this.props.myLocation.lat = latitude;
        this.props.myLocation.lng = longitude;

        //this.props({lat:latitude,lng: longitude });
      })}
  
 
  render() {
    

    return (
        
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: YOUR_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
            <Post
            lat={this.props.postArray.lat}
            lng={this.props.postArray.lng}
            comp = "text"
            />
            <AnyReactComponentMyPlace
            lat={this.props.myLocation.lat}
            lng={this.props.myLocation.lng}
            text="My Position"
            />
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
