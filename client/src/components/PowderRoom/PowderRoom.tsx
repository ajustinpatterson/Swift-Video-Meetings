<<<<<<< HEAD
import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { BrowserRouter, Link } from 'react-router-dom';
import Meeting from '../../containers/Meeting/Meeting';

const PowderRoom = (): JSX.Element => {

  const myVideoRef = useRef(null);

  return (
    <div>
      <div>
        <Webcam ref={myVideoRef} />
      </div>

      <BrowserRouter>
        <Link to="/" component={Meeting}>
          <button className="button">THIS IS THE POWDER ROOM. ENTER THE MEETING HERE</button>
        </Link>
      </BrowserRouter>
=======
import React from 'react';
import { useHistory } from 'react-router-dom';
import './PowderRoom.css';

const PowderRoom = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/meeting');
  };

  return (
    <div className="container">
      🐼 -- Everything is going to turn up aces
      <div className="button">Mic</div>
      <div className="button" onClick={handleClick}>
        Ready
      </div>
      <div className="button">Camera</div>
>>>>>>> origin/front-end-auth-and-nav
    </div>
  );
};

export default PowderRoom;
