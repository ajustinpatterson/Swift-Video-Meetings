import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  useHistory,
  Link,
} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import logo from '../../assets/swift-logo.png';
import { CREATE_USER } from '../../graphql/Client';
import './Landing.css';

const apiId =
  '770694473973-nsm7s39sp1tvm3jpg6d3pk7ln309gvbr.apps.googleusercontent.com';

const Landing = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const active = localStorage.getItem('loggedIn');
  const [createUser, newUser] = useMutation(CREATE_USER);

  const handleClick = () => {
    history.push('/powderroom');
  };

  const responseGoogle = async (response: any) => {
    try {
      console.log(response);
      if (response) {
        setUserName(response.profileObj.name);
        createUser({
          variables: {
            userDetails: {
              email: response.profileObj.email,
              familyName: response.profileObj.familyName,
              givenName: response.profileObj.givenName,
              googleId: response.profileObj.googleId,
              imageUrl: response.profileObj.imageUrl,
              name: response.profileObj.name,
            },
          },
        });
        localStorage.setItem('loggedIn', `${loggedIn}`);
        setLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="landing">
      <img src={logo} alt="Logo" />
      {!active ? (
        <GoogleLogin
          clientId={apiId}
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
        <button className="button" onClick={handleClick}>
          Start Meeting
        </button>
      )}
    </div>
  );
};

export default Landing;
