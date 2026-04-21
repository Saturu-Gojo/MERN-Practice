import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import './FacialExpression.css';

const FacialExpression = ({ setSongs }) => {
  const videoRef = useRef();
  const [expression, setExpression] = useState("Ready to Scan");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        startVideo();
      } catch (err) {
        console.error("Model loading failed", err);
      }
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => { videoRef.current.srcObject = stream; })
      .catch((err) => console.error("Webcam access denied", err));
  };

  const recognizeExpression = async () => {
    if (videoRef.current && modelsLoaded) {
      setIsScanning(true);
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const bestExpression = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );
        
        setExpression(bestExpression);

        try {
          const response = await axios.get(`http://localhost:3000/songs?mood=${bestExpression}`);
          if (response.data && response.data.songs) {
            setSongs(response.data.songs);
          }
        } catch (err) {
          console.error("API Error:", err);
        }
      } else {
        setExpression("No face detected");
      }
      setIsScanning(false);
    }
  };

  return (
    <div className="card-container">
      <div className="status-badge">
        {isScanning ? "Analyzing..." : expression.toUpperCase()}
      </div>

      <div className="video-wrapper">
        <video className="user-video" ref={videoRef} autoPlay muted />
        <div className="scan-overlay"></div>
      </div>

      <button 
        onClick={recognizeExpression} 
        disabled={!modelsLoaded || isScanning} 
        className="main-button"
      >
        {modelsLoaded ? "Scan My Mood" : "Initializing AI..."}
      </button>
    </div>
  );
};

export default FacialExpression;