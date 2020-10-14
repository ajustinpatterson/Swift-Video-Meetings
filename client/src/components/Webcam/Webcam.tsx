import React, { useRef } from 'react';
import Webcam from 'react-webcam';

export const WebcamComponent = () => {
  const webcamRef = React.useRef(null);

  console.log(webcamRef.current);

  return <Webcam />;
};
