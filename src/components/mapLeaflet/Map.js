import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import PropTypes from "prop-types";

const LocationSelector = ({ initialLat, initialLng, zoom }) => {
  const [location, setLocation] = useState({
    lat: initialLat,
    lng: initialLng,
  });
  const [radius, setRadius] = useState(500); // Initial radius in meters
  const handleMarkerDrag = (e) => {
    const newLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setLocation(newLocation);
  };

  console.log(location); 

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
        <GoogleMap
          center={location}
          zoom={zoom}
          mapContainerStyle={{ width: "100%", height: "800px" }}
        >
          <Marker
            position={location}
            draggable={true}
            onDragEnd={handleMarkerDrag}
            key={Math.random()}
          />
          <Circle
            center={location}
            radius={radius}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
};
LocationSelector.propTypes = {
  initialLat: PropTypes.number,
  initialLng: PropTypes.number,
  locationName: PropTypes.string,
  zoom: PropTypes.number,
};
export default LocationSelector;
