import React from "react";
import { useQuery, gql } from '@apollo/client';

export const GET_FILES = gql `
  query {
    getFiles {
      _id
      filename
      mimetype
      path
    }
}
`

export const Files = () => {

  const { data, loading, error } = useQuery(GET_FILES);

  if (error) {
    console.log(error)
  };

  return (

    //need to grab files from db and render them

    <div>


    </div>
  )
}
