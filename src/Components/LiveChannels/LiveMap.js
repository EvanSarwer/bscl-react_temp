import React from "react";
import "./styles.css";

import GoogleMapReact from "google-map-react";
import MyMarker from "./MyMarker";

// implementation of this function is needed for codesandbox example to work
// you can remove it otherwise
const distanceToMouse = (pt, mp) => {
  if (pt && mp) {
    // return distance between the marker and mouse pointer
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};



export default function LiveMap(props) {
  return (
    <div className="App">
      
      <GoogleMapReact
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: "AIzaSyArhpFu0y-lau5KNowgPd-HZFjGLzbB9Cs",
          language: "en",
          region: "US"
        }}
        defaultCenter={{ lat:23.5, lng: 90}}
        defaultZoom={7}
        distanceToMouse={distanceToMouse}
      >
        {props.points.map(({ lat, lng, id, title }) => {
          return (
            <MyMarker key={id} lat={lat} lng={lng}  tooltip={title} />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
