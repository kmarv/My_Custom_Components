import React from 'react';
import './App.css';
import LocationMap from './components/mapLeaflet/LocationMap';

function App() {
  return (
    <div className="row">
      <div className='col-md-12'>
      <LocationMap  />
      </div>
    </div>
  );
}

export default App;