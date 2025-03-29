import React, { useState } from 'react';


export default function Camera() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    setImage(URL.createObjectURL(file));
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error analyzing image:', error);
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
        id="camera-input"
      />
      <label htmlFor="camera-input">
        <button disabled={loading}>
          {loading ? 'Analyzing...' : 'Take Food Photo'}
        </button>
      </label>
      
      {image && (
        <div className="image-preview">
          <img src={image} alt="Captured food" />
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