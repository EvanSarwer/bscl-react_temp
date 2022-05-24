import React from "react";
import ReactDOM from "react-dom";
import InteractiveMap, { Marker } from "react-map-gl";

function Map() {
    const [markers, setMarkers] = React.useState([]);
    const handleClick = ({ lngLat: [longitude, latitude] }) =>
      setMarkers(markers => [...markers, { longitude, latitude }]);
  
    /**
     * Manage viewport in state
     */
    const [viewport, setViewport] = React.useState({
      latitude: -37.8136,
      longitude: 144.96332,
      zoom: 14.5,
      pitch: 40,
      bearing: 0
    });
  return (
    <InteractiveMap
      // onClick, capture the pointer event so we can
      // get the lngLat of the click.
      onClick={handleClick}
      // required for interactivity
      width="100vw"
      height="100vh"
      mapboxApiAccessToken="pk.eyJ1IjoiZ2lzZmVlZGJhY2siLCJhIjoiY2l2eDJndmtjMDFkeTJvcHM4YTNheXZtNyJ9.-HNJNch_WwLIAifPgzW2Ig"
      onViewportChange={viewport => setViewport(viewport)}
      {...viewport}
    >
      {markers.length
        ? markers.map((m, i) => (
            // <Marker /> just places its children at the right lat lng.
            <Marker
        latitude={23.777176}
        longitude={90.399452}
        offsetLeft={-20}
        offsetTop={-30}
      >
        <img
          style={{ height: 50, width: 50 }} alt="ss"
          src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
        />
      </Marker>
          ))
        : null}
    </InteractiveMap>
  );
}

export default Map;