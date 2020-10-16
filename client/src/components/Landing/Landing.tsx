import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  useHistory,
  Link,
} from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import logo from '../../assets/swift-logo.png';
import './Landing.css';
import { useMutation, gql } from '@apollo/client';
import { stringify } from 'querystring';


const apiId =
  '770694473973-nsm7s39sp1tvm3jpg6d3pk7ln309gvbr.apps.googleusercontent.com';

const CREATE_USER = gql`
  mutation AddAUser(
    $email: String!
    $familyName: String!
    $givenName: String!
    $googleId: String!
    $imageUrl: String!
    $name: String!
  ) {
    createUser(
      email: $email
      familyName: $familyName
      givenName: $givenName
      googleId: $googleId
      imageUrl: $imageUrl
      name: $name
    ) {
      email
      familyName
      givenName
      googleId
      imageUrl
      name
    }
  }
`;

const Landing = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState('');
  const [createUser, newUser] = useMutation(CREATE_USER);
  const history = useHistory();
  const active = localStorage.getItem('loggedIn');


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
            email: response.profileObj.email,
            familyName: response.profileObj.familyName,
            givenName: response.profileObj.givenName,
            googleId: response.profileObj.googleId,
            imageUrl: response.profileObj.imageUrl,
            name: response.profileObj.name,
          },
        });
        // localStorage.setItem('loggedIn', `${loggedIn}`);
        // setLoggedIn(true);
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


//// export const GET_USERS = gql`
//   query GetAllUsers {
//     getUsers {
//       id
//       email
//       familyName
//       givenName
//       googleId
//       imageUrl
//       name
//     }
//   }
// `;

// export const CREATE_USER = gql`
//   mutation AddAUser($newUser: CreateUserInput) {
//     createUser(userDetails: $newUser) {
//       id
//       email
//       familyName
//       givenName
//       googleId
//       imageUrl
//       name
//     }
//   }
// `;

// export const UPDATE_USER = gql`
//   mutation UpdateUser($input: MutationUpdateUser) {
//     updateUser(input: userDetails) {
//       id
//       email
//       familyName
//       givenName
//       googleId
//       imageUrl
//       name
//       bio
//       status
//     }
//   }
// `;

// export const UPDATE_EMAIL = gql`
// mutation UpdateEmail($input: MutationUpdateEmail) {
//   updateEmail({id, email}: $input) {
//     id
//     email
//   }
// }
// `;

// export const DELETE_USER = gql`
//   mutation DeleteUser($input: MutationDeleteUser) {
//     deleteUser(id: $input) {
//       id
//     }
//   }
// `;
