import React, { useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  const markerRef = useRef(null);

  const handleMarkerDragEnd = (e) => {
    const marker = e.target;
    setPosition(marker.getLatLng());
  };
  console.log(position);

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
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={153}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, height:'400px', width:'100%' }}
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
