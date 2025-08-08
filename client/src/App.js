import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Backwoods Adventure Tracker</h1>
        <p>Track your outdoor adventures with Backwoods</p>
        <div className="features">
          <h2>Features:</h2>
          <ul>
            <li>📍 Create and track trip waypoints</li>
            <li>🗺️ Google Maps integration</li>
            <li>📱 Mobile-friendly design</li>
            <li>📊 Trip progress tracking</li>
            <li>💳 Stripe payment integration</li>
            <li>🔐 User authentication</li>
          </ul>
        </div>
        <p>
          This is the Backwoods React app running in development mode.
        </p>
      </header>
    </div>
  );
}

export default App;