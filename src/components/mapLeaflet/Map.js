import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const LocationSelector = (props) => {
    
  const [location, setLocation] = useState(); // Initialize with default coordinates

  const handleMarkerDrag = (coord, map, e) => {
    setLocation({ lat: coord.lat(), lng: coord.lng() });
  };

  useEffect(() => {
    // Fetch user's current location using the geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        const userPosition = {latitude, longitude};
        setLocation(userPosition);
      });
    }
  }, [location]);

  return (
    <Map google={props.google} initialCenter={location}>
      <Marker
        name={'Location Pin'}
        position={location}
        draggable={true}
        onDrag={handleMarkerDrag}
        onDragend={handleMarkerDrag}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
})(LocationSelector);
