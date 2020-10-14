import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import logo from '../../assets/swift-logo.png';
import './Landing.css';

const Landing = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState('');

  const responseGoogle = (response: any) => {
    console.log(response);
    if (response) {
      setUserName(response.profileObj.name);
    }
  };

  return !loggedIn ? (
    <div className="landing">
      <img src={logo} alt="Logo" />
      <GoogleLogin
        className="button"
        clientId="770694473973-nsm7s39sp1tvm3jpg6d3pk7ln309gvbr.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  ) : (
    <div className="landing">
      <img src={logo} alt="Logo" />

      <button className="button">Start Meeting</button>
    </div>
  );
};

export default Landing;
