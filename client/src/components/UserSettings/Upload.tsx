import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, gql } from '@apollo/client';
import { fileQuery } from './Files';

const uploadFileMutation = gql `
  mutation Upload File ($file: Upload!) {
    UploadFile (file: $file)
  }
`

const Upload = () => {
  const [ uploadFile ] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: fileQuery }]
  });

  const onDrop = useCallback(
    ([ file ]) => {
      uploadFile({ variables: { file } });
    },
    [ uploadFile ]
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the files here ...</p>
          : <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );

};