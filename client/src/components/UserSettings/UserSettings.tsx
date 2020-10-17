import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import logo from '../../assets/swift-logo.png';

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

  const [ user, setUser ] = useState<User>({
    name: '',
    email: '',
    bio: '',
    image: '',
    status: ''
  })

  const handleChange = (event: ChangeEvent) => {

  }

  const handleSubmit = (event: FormEvent, input: String) => {
    event.preventDefault();
    //call mutation function
  }

  return (
    <div className="user-settings-container">
      <div>
        Account Settings
      </div>

      <form
        className="form-user-settings"
        onSubmit={handleSubmit}
      >
        <h4>Image</h4>
        <img src={logo} alt="logo" width="200"/>

        <h4>Name</h4>
        <input
        placeholder={user.name}
        name="name"
        type="text"
        value={user.name}
        >
        </input>

        <h4>Email</h4>
        <input
        placeholder='mo@gmail.com'
        >
        </input>

        <h4>Bio</h4>
        <input
        placeholder='From somewhere else'
        >
        </input>

        <h4>Status</h4>
        <input
        placeholder='Coding allll day'
        >
        </input>

       <button
        type="submit"
        className="form_submit"
       >
         Save changes
       </button>

      </form>
    </div>
  )
};

