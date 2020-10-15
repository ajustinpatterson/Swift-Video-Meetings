import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import GET_USERS from '../graphql/Client';

export const CompareUser = (name: string) => {
  try {
    const { loading, error, data } = useQuery(GET_USERS);
    data.includes(name) ? data : null;
  } catch (err) {
    console.log(err);
  }
};
