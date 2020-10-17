import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { gql, useQuery } from '@apollo/client';

export default function UserProfile (): JSX.Element {

  const GET_USER_BY_ID = gql`
    query GetUserByID ($id: String!) {
      getUserById (_id: $id) {
        name
        email
        imageUrl
        bio
        status
      }
    }
`

  const {data, loading, error}  = useQuery(
    GET_USER_BY_ID,
      {
        variables: {
          _id: "dd4580e5-7142-4d8c-8999-b1493eb7a4a8"
        }
      }
  );

  return (
    <div>

      <div>
        <div>
          <img/>
        </div>

        <div>
          Name
        </div>

        <div>
          Email
        </div>

        <div>
          Bio
        </div>

        <div>
          Status
        </div>

      </div>

    </div>
  )
};

