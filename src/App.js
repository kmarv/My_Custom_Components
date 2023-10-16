import React from 'react';
import './App.css';
// import LocationMap from './components/mapLeaflet/LocationMap';
import LocationSelector from './components/mapLeaflet/Map';

function App() {
  return (
    <div className="row">
      <div className='col-md-12'>
      <LocationSelector zoom={19} initialLat={51.505} initialLng={-0.09}  locationName={'london'}  />
      </div>
    </div>
  );
}

export default App;