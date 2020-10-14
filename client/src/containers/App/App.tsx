import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import Meeting from '../Meeting/Meeting';
import './App.css';
// import Landing from '../../components/Landing/Landing';
import UserSettings from '../../components/UserSettings/UserSettings';

interface props {
  socket: any;
}

function App({ socket }: props) {
  return <UserSettings />;
}

export default App;
