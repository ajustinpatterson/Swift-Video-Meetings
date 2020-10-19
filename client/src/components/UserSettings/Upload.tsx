import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, gql } from '@apollo/client';
import { GET_FILES } from './Files';

const uploadFileMutation = gql `
  mutation UploadFile ($file: Upload!) {
    uploadFile (file: $file) {
      _id
      path
      filename
      mimetype
    }
  }
`

const Upload = () => {
  const [ uploadFile ] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: GET_FILES }]
  });

  const onDrop = useCallback(
    ([ file ]) => {
      uploadFile({
        variables: { file }
      });
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