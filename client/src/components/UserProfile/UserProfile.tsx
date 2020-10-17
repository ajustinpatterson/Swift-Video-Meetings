import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { gql, useQuery } from '@apollo/client';

export default function UserProfile (): JSX.Element {

//   const GET_USER_BY_ID = gql`
//     query GetUserByID ($id: String!) {
//       getUserById (_id: $id) {
//         name
//         email
//         imageUrl
//         bio
//         status
//       }
//     }
// `

//   const {data, loading, error}  = useQuery(
//     GET_USER_BY_ID,
//       {
//         variables: {
//           _id: "dd4580e5-7142-4d8c-8999-b1493eb7a4a8"
//         }
//       }
//   );

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

  const { data, loading, error }  = useQuery(GET_USERS);


  return (
    <div>

      <div>
        <div>
          <img src={data?.getUsers[0]?.imageUrl} />
        </div>

        <div>
          {data?.getUsers[0]?.name}
        </div>

        <div>
        {data?.getUsers[0]?.email}
        </div>

        <div>
        {data?.getUsers[0]?.bio}
        </div>

        <div>
          {data?.getUsers[0]?.status}
        </div>

      </div>

    </div>
  )
};

