import React from 'react';
import './index.css'; // Assuming your CSS file is named App.css

const AddressSelector = () => {
  return (
    <section className="address-selector">
      <div className="address-block current">
        <h2>Current Address</h2>
        <input 
          type="text" 
          className="address-input" 
          placeholder="Enter your current address" 
        />
      </div>
      <div className="address-block destination">
        <h2>Destination Address</h2>
        <input 
          type="text" 
          className="address-input" 
          placeholder="Enter your destination address" 
        />
      </div>
    </section>
  );
};


const MapSection = () => {
  return (
    <section className="map">
      {/* This is a placeholder for the map component */}
      Map
    </section>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <main>
        <AddressSelector />
        <MapSection />
      </main>
    </div>
  );
};

export default App;
