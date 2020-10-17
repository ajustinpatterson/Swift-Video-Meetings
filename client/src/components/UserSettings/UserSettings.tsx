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

  const UPDATE_USER = gql`
    mutation UpdateUser(
      $userDetails: UpdateUserInput!
    ) {
      updateUser(
        userDetails: $userDetails
      ) {
        name
        email
        bio
        imageUrl
        status
      }
    }
  `;

  const { data, loading, error }  = useQuery(GET_USERS);
  const [ updateUser ]  = useMutation<{updateUser: User}>(UPDATE_USER);

  interface User {
    _id: string
    name: string
    email: string
    bio: string
    image: string
    status: string
  }

  const [ user, setUser ] = useState<User>({
    _id: '',
    name: '',
    email: '',
    bio: '',
    image: '',
    status: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    const stateKey = event.target.name;
    setUser(prevState => ({
      ...prevState,
      [stateKey]: newValue
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateUser({
      variables: {
        name: user.name,
        email: user.email,
        bio: user.bio,
        image: user.image,
        status: user.status
      }
    })
    }

    // useEffect(() => {
    //   console.log(data)
    //   if (data?.getUsers) {
    //     console.log(data.getUsers[0])
    //   }
    // }, [data])

  return (
    <div className="user-settings-container">

      <div>
        User Settings
      </div>

      <form
        className="form-user-settings"
        onSubmit={handleSubmit}
      >
        <label htmlFor="image">Image</label>
        <img src={logo} alt="logo" width="200"/>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder={data?.getUsers[0]?.name}
          name="name"
          type="text"
          value={data?.getUsers[0]?.name}
          onChange={handleChange}
        >
        </input>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder={user.email}
          name="email"
          type="text"
          value={user.email}
          onChange={handleChange}
        >
        </input>

        <label htmlFor="bio">Bio</label>
        <input
          id="bio"
          placeholder={user.bio}
          name="bio"
          type="text"
          value={user.bio}
          onChange={handleChange}
        >
        </input>

        <label htmlFor="status">Status</label>
        <input
          id="status"
          placeholder={user.status}
          name="status"
          type="text"
          value={user.status}
          onChange={handleChange}
        >
        </input>

       <button
        type="submit"
       >
         Save Changes
       </button>

      </form>
    </div>
  )
};

