import React, { useRef, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();
  const markerRef = useRef(null);

  const handleMarkerDragEnd = (e) => {
    const marker = e.target;
    setPosition(marker.getLatLng());
  };

  useEffect(() => {
    // Fetch user's current location using the geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        const userPosition = [latitude, longitude];
        setPosition(userPosition);
        map.flyTo(userPosition, map.getZoom());
        if (markerRef.current) {
          markerRef.current.setLatLng(userPosition);
        }
      });
    }
  }, [map]);

  return position === null ? null : (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: handleMarkerDragEnd,
      }}
      ref={markerRef}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

const LocationMap = () => {
  return (
    <MapContainer
    center={{lat:51.505, lng:-0.09}}
    zoom={153}
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, height: '800px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default LocationMap;
