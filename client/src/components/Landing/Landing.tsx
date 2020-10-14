import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import logo from '../../assets/swift-logo.png';
import './Landing.css';

const Landing = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState('');

  const responseGoogle = async (response: any) => {
    try {
      console.log(response);
      if (response) {
        setUserName(response.profileObj.name);
        setLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="landing">
      <img src={logo} alt="Logo" />
      {!loggedIn ? (
        <GoogleLogin
          clientId="770694473973-nsm7s39sp1tvm3jpg6d3pk7ln309gvbr.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              className="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login
            </button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <button className="button">Start Meeting</button>
      )}
    </div>
  );
};

export default Landing;
