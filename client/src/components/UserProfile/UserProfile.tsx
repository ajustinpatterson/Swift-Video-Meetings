import React from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { GET_USERS } from '../../graphql/Queries';
import './UserProfile.scss';

export default function UserProfile(): JSX.Element {

  const { data, loading, error } = useQuery(GET_USERS);

  const history = useHistory();

  function handleSettings () {
    history.push('/userSettings')
  };

  return (
    <div className="container">

      <div className="row">
        <div className="column-1">
          <div className="greeting">Hello, {data?.getUsers[0]?.givenName}</div>
          <div className="name">{data?.getUsers[0]?.name}</div>
          <div className="status">{data?.getUsers[0]?.status}</div>
          <div className="email">{data?.getUsers[0]?.email}</div>
          <div className="bio">{data?.getUsers[0]?.bio}</div>
          <button className="btn" onClick={handleSettings}>
            Edit profile
          </button>
        </div>
        <div className="column-2">
          <img src={data?.getUsers[0]?.imageUrl} className="user-img"/>
          <div className="color-box"></div>
        </div>
      </div>
    </div>
  );
}