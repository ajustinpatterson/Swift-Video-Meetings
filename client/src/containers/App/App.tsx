<<<<<<< HEAD
import Peer from 'peerjs';
import Webcam from 'react-webcam';
import React, { useState, useEffect, useRef } from 'react';
=======
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../components/Routes/Routes';
import Meeting from '../Meeting/Meeting';
>>>>>>> origin/front-end-auth-and-nav
import './App.css';

interface props {
  socket: any;
  history: any;
}

<<<<<<< HEAD
function App({ socket }: props) {
  const myVideoRef = useRef(null)
  const otherVideoRef = useRef(null)
  const [hasOtherJoined, setHasOtherJoined] = useState(false)
  const connectToNewUser = (userId: string) => {};

  useEffect(() => {
    // connect the socket
    socket.on('connect', () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          console.log('my stream', stream);
          (myVideoRef.current! as any).video.srcObject = stream;
          // myVideoRef.current.video.srcObject = stream;
          // create the peer
          const peer = new Peer(undefined, {
            host: 'localhost',
            port: 4000,
            path: '/',
          });
          // set peer listeners
          peer.on('error', (err) => {
            console.log('error', err);
          });
          peer.on('connection', () => {
            console.log('some peer connected');
          });
          // on open the peer it will tell the other user that a new user join
          peer.on('open', (peerId) => {
            console.log('My peerId ->', peerId);
            // to get the others peer id wee
            socket.emit('join-room', 12345, socket.id, peerId);
          });
          // whenever a new user connects it will connect to him through the peerId
          socket.on('user-connected', (userId: string, otherPeerId: string) => {
            console.log('Other user peerId ->', otherPeerId);
            const call = peer.call(otherPeerId, stream);
            call.on('stream', (otherUserVideoStream) => {
              // it gets called two times for each type of track audio and video
              console.log('other stream', otherUserVideoStream);
              addSecondVideoStream(otherUserVideoStream)
            });
          });

          peer.on('call', (call) => {
            call.answer(stream);
            // const video = document.createElement('video');
            call.on('stream', (otherUserVideoStream) => {
              // it gets called two times for each type of track audio and video
              console.log('other stream', otherUserVideoStream);
              // add other user video to dom
              addSecondVideoStream(otherUserVideoStream)
            });
            call.on('close', () => {
              // remove video
            });
          });
        });
    });
  }, []);

  function addSecondVideoStream(stream: any) {
    setHasOtherJoined(true);
    (otherVideoRef.current! as any).video.srcObject = stream;
    // ...
  }

  return (
    <div className="App">
      {console.log(socket)}
      <a href="http://localhost:4000" target="_blank">
        click here
      </a>
      <Webcam ref={myVideoRef} />
      {hasOtherJoined && <Webcam ref={otherVideoRef} />}
    </div>
=======
function App({ socket }: any) {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
>>>>>>> origin/front-end-auth-and-nav
  );
}

export default App;


