import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/Queries';

export default function UserProfile (): JSX.Element {

  const { data, loading, error }  = useQuery(GET_USERS);

  return (
    <div>

      <div>
        Hello {data?.getUsers[0]?.name}
      </div>

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

        <button>
          Edit profile
        </button>

      </div>

    </div>
  )
};

