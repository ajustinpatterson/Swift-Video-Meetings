import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';
import Meeting from '../../components/Meeting/Meeting';
import './App.css';

interface props {
  socket: any;
}

function App({ socket }: props) {
  const connectToNewUser = (userId: string) => {};

  const myPeer = new Peer(undefined, {
    host: '/',
    port: 3002,
  });

  const peers = {};
  let myVideo = <video />;

  useEffect((): any => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream: MediaStream) => {
        addVideoStream(myVideo, stream);
        console.log('inside video maker thing', myVideo);

        myPeer.on('call', (call) => {
          call.answer(stream);
          const video = <video />;
          call.on('stream', (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });
        socket.on('connect', () => {
          socket.emit('join-room', 12345, socket.id);
          socket.on('user-connected', (userId: string) => {
            console.log(userId);
            connectToNewUser(userId);
          });
        });
      });

    function addVideoStream(video: any, stream: any) {
      myVideo = <video src={stream} />;
    }
  }, []);

  // socket.on('test', (data: any) => {
  //   console.log(data);
  // });

  return (
    <div className="App">
      {myVideo}
      {console.log(socket)}
      <a href="http://localhost:3002" target="_blank">
        click here
      </a>
    </div>
  );
}

export default App;
