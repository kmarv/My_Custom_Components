import React from 'react';
import './App.css';
// import LocationMap from './components/mapLeaflet/LocationMap';
import MapWithDraggablePin from './components/mapLeaflet/Map';

function App() {
  return (
    <div className="row">
      <div className='col-md-12'>
      <MapWithDraggablePin  />
      </div>
    </div>
  );
}

export default App;