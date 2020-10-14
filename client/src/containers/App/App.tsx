import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import Meeting from '../Meeting/Meeting';
import './App.css';
import Landing from '../../components/Landing/Landing';

interface props {
  socket: any;
}

function App({ socket }: props) {
  return <Landing />;
}

export default App;
