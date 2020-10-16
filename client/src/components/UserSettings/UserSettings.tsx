import React, { useEffect, useState } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { updateLanguageServiceSourceFile } from 'typescript';
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

  const UPDATE_USER = gql `
    mutation UpdateUser {
      updateUser {

      }
    }
  `

  const {data, loading, error} = useQuery(GET_USERS);
  const {updateUser} = useMutation(UPDATE_USER);

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

  useEffect(() => {
    setUser({name: data.name})
  }, []);

  const setModal = () => {

  };

  const onSubmit = (input) => {
    setModal(false);
    updateUser({

    })
  };

  return (
    <div className="user-settings-container">
      <div>
        Account Settings
      </div>

      <div className="edit-image">
        <h3>Image</h3>
        <h4>{user.image} My mugshot</h4>
        <button>Edit</button>
      </div>

      <div className="edit-name">
        <h3>Name</h3>
        <h4>{user.name} Mo</h4>
        <button>Edit</button>
      </div>

      <div className="edit-email">
        <h3>Email</h3>
        <h4>{user.email} mo@gmail.com</h4>
        <button>Edit</button>
      </div>

      <div className="edit-bio">
        <h3>Bio</h3>
        <h4>{user.bio} Just a small town girl living in a lonely world</h4>
        <button>Edit</button>
      </div>

      <div className="edit-status">
        <h3>Status</h3>
        <h4>{user.status} Swifting so hard</h4>
        <button>Edit</button>
      </div>

    </div>
  )
};

