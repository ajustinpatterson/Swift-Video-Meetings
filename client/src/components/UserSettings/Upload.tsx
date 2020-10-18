import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, gql } from '@apollo/client';

const uploadFileMutation = gql `
  mutation Upload File ($file: Upload!) {
    UploadFile (file: $file)
  }
`

const Upload = () => {
  const [ uploadFile ] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }]
  })
}