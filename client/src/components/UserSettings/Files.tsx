import React from "react";
import { useQuery, gql } from '@apollo/client';

export const fileQuery = gql `
    {
      file
    }
  `

export const Files = () => {

  const { data, loading, error } = useQuery(fileQuery);

  if (error) {
    console.log(error)
  };

  return (
    <div>


    </div>
  )
}
