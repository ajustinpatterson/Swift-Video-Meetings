import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../components/Routes/Routes';
import Meeting from '../Meeting/Meeting';
import './App.css';
import Landing from '../../components/Landing/Landing';

interface props {
  socket: any;
  history: any;
}

function App({ socket }: any) {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
