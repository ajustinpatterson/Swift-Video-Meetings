import React from 'react';
import logo from '../../assets/swift-logo.png';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <img src={logo} alt="Logo" />
      <button className="button">Start Meeting</button>
    </div>
  );
};

export default Landing;
