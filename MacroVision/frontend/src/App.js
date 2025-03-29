import React from 'react';
import './App.css';  // Add this import
import Camera from './components/Camera';

function App() {
  return (
    <div className="App">
      <h1>MacroVision Nutrition Analyzer</h1>
      <Camera />
    </div>
  );
}

export default App;