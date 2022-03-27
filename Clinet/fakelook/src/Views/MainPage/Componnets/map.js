import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

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
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: YOUR_API_KEY }}
          defaultCenter={this.props.myLocation}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponentMyPlace
            lat={this.props.myLocation.lat}
            lng={this.props.myLocation.lng}
            text="My Position"
          />
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
