import React, { useState } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
// import { User }  from './User';

export default function UserSettings (): JSX.Element {

  const GET_USERS = gql`
    query {
      getUsers {
        email
        imageUrl
        name
        bio
        status
      }
    }
  `

  const {data, loading, error} = useQuery(GET_USERS);

  console.log(data)

  interface User {
    name: string
    email: string
    bio: string
    image: string
    status: string
  }

  const [ user, setUser] = useState<User>({
    name: '',
    email: '',
    bio: '',
    image: '',
    status: ''
  })

  return (
    <div>
      <div>
        Change Your User Settings
      </div>

      <div className="edit-image">
        <h3>Image</h3>
        <h4>My mugshot</h4>
        <button>Edit</button>
      </div>

      <div className="edit-name">
        <h3>Name</h3>
        <h4>Mo</h4>
        <button>Edit</button>
      </div>

      <div className="edit-email">
        <h3>Email</h3>
        <h4>mo@gmail.com</h4>
        <button>Edit</button>
      </div>

      <div className="edit-bio">
        <h3>Bio</h3>
        <h4>Just a small town girl living in a lonely world</h4>
        <button>Edit</button>
      </div>

      <div className="edit-status">
        <h3>Status</h3>
        <h4>Swifting so hard</h4>
        <button>Edit</button>
      </div>


    </div>
  )
};

