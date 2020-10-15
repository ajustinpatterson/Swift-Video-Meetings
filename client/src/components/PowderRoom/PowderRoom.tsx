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
    </div>
  );
};

export default PowderRoom;
