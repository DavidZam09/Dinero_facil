import React, { useRef, useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
      const compressedBlob = await compressImage(blob);
      const namedFile = new File([compressedBlob], 'image.png', { type: 'image/png' });
      onCapture(namedFile);
      stopCamera();
    }, 'image/png', 0.95);
  };

  const compressImage = async (imageBlob) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      return await imageCompression(imageBlob, options);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setIsCameraOn(false);
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        stopCamera();
      }
    };
  }, []);

  return (
    <div>
      <div>
        <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      {!isCameraOn && <button onClick={startCamera}>Start Camera</button>}
      {isCameraOn && <button onClick={capturePhoto}>Capture Photo</button>}
    </div>
  );
};

export default CameraCapture;
