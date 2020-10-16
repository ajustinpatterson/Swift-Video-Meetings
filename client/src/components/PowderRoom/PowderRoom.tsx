import React from 'react';
import { useHistory } from 'react-router-dom';
import './PowderRoom.css';

const PowderRoom = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/meeting');
  };

  return (
    <div className="pwdrcontainer">
      🐼 -- Everything is going to turn up aces
      <div className="pwdrbutton">Mic</div>
      <div className="button" onClick={handleClick}>
        Ready
      </div>
      <div className="button">Camera</div>
    </div>
  );
};

export default PowderRoom;
