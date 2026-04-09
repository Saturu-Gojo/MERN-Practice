import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const FacialExpression = () => {
  const videoRef = useRef();
  const [expression, setExpression] = useState("Click the button to scan...");
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    // Load models and start video
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
      startVideo();
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => { videoRef.current.srcObject = stream; })
      .catch((err) => console.error("Webcame access denied",err));
  };

  const recognizeExpression = async () => {
    
      if (videoRef.current && modelsLoaded) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current, 
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceExpressions();

        if (detections.length > 0) {
          // Get the emotion with the highest confidence score
          const expressions = detections[0].expressions;
          const bestExpression = Object.keys(expressions).reduce((a, b) => 
            expressions[a] > expressions[b] ? a : b
          );
          setExpression(bestExpression);
        }else{
          setExpression("No face detected. Try again!");
        }
      }


  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' , backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px'}}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Facial Expression Recognition</h1>
    <div>
      <h2>Current Expression: {expression}</h2>
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        width="640" 
        height="480" 
        style={{ borderRadius: '10px', background: '#000' }}
      />
    </div>

    <button 
      onClick = {recognizeExpression}
      disabled={!modelsLoaded}
      style = {{
        padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: modelsLoaded ? '#28a745' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
      }}>
      {modelsLoaded ? "Scan Expression" : "Loading Models..."}
      </button>
    </div>

  );
};

export default FacialExpression;