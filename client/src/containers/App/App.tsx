import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import Webcam from 'react-webcam';
import Meeting from '../../components/Meeting/Meeting';
import './App.css';
import Landing from '../../components/Landing/Landing';

interface props {
  socket: any;
}

function App({ socket }: props) {
  return <Landing />;
}

export default App;
