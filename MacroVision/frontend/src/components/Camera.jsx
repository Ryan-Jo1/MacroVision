import React, { useState, useRef } from 'react';
import { predictMacros } from '../services/api';

export default function Camera() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const prediction = await predictMacros(file);
      setResults(prediction);
    } catch (error) {
      alert('Error analyzing food: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="camera-container">
      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        style={{ display: 'none' }}
      />
      
      <button 
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Take Food Photo'}
      </button>

      {image && (
        <div className="image-preview">
          <img src={URL.createObjectURL(image)} alt="Captured food" />
        </div>
      )}

      {results && (
        <div className="results">
          <h3>{results.food}</h3>
          <p>Portion: {results.portion_g}g</p>
          <ul>
            <li>Protein: {results.macros.protein}g</li>
            <li>Carbs: {results.macros.carbs}g</li>
            <li>Fat: {results.macros.fat}g</li>
          </ul>
        </div>
      )}
    </div>
  );
}