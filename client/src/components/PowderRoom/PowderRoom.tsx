import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const PowderRoom = () => {

  const myVideoRef = useRef(null);

  return (
    <div>
      <div>
        <Webcam ref={myVideoRef} />
      </div>
      <div>
        THIS IS THE POWDER ROOM. READY TO ENTER THE MEETING ROOM?
      </div>
    </div>
  );
};

export default PowderRoom;
