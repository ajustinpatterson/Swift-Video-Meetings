import React from "react";
import { useQuery, gql } from '@apollo/client';

const fileQuery = gql `
    {
      file
    }
  `

export default function Files () {

  const { data, loading, error } = useQuery(fileQuery);

  if (error) {
    console.log(error)
  };

  return (
    <div>


    </div>
  )
}
