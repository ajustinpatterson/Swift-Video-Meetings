import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Routes from '../../components/Routes/Routes';

// import {uuid} from '../../uuid';

interface props {
  socket: any;
}
// // console.log('uuid: ', uuid);
function App({ socket }: props) {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
}
export default App;
