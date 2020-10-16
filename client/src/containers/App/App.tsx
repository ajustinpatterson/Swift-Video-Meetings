import Peer from 'peerjs';
import Webcam from 'react-webcam';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  BrowserRouter,
  Router,
  Route,
  useHistory,
  Link,
} from 'react-router-dom';
import Routes from '../../components/Routes/Routes';
// import {uuid} from '../../uuid';
interface props {
  socket: any;
}
// console.log('uuid: ', uuid);
function App({ socket }: props) {
  const myVideoRef = useRef(null);
  const otherVideoRef = useRef(null);
  const [hasOtherJoined, setHasOtherJoined] = useState(false);
  // const [hasVideo, setHasVideo] = useState(true);
  const peer = new Peer(undefined, {
    host: 'localhost',
    port: 4000,
    path: '/',
  });
  useEffect(() => {
    socket.on('connect', () => {
      const connectToNewUser = (userId: string, otherPeerId: string, stream: MediaStream) => {
        console.log('Other user peerId ->', otherPeerId);
        // call is emitted when a remote peer attempts to call you.
        const mediaConnection = peer.call(otherPeerId, stream);
        mediaConnection.on('stream', (otherUserStream: any) => {
          // it gets called two times for each type of track audio and video
          console.log('other stream', otherUserStream);
          addSecondVideoStream(otherUserStream)
        })
      };
      function addSecondVideoStream(stream: any) {
        setHasOtherJoined(true);
        (otherVideoRef.current! as any).video.srcObject = stream;
        // ...
      }
      // create the peerobject with no id which will be automaticaly assigned (uuid) on the open evennt
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true
        })
        .then((stream) => {
          (myVideoRef.current! as any).video.srcObject = stream;
          console.log('my stream', stream);
          // set peer listeners
          peer.on('error', (err) => {
            console.log('error', err);
          });
          // connection is emitted when a connection to the PeerServer is established.
          peer.on('connection', () => {
            console.log('some peer connected');
          });
          // open is emitted when a new data connection is established from a remote peer.
          // the peerID is automatically generated here with the uuid lib
          peer.on('open', (peerId) => {
            console.log('My peerId ->', peerId);
            // to get the others peer id wee
            socket.emit('join-room', 12345, socket.id, peerId);
          });
          // whenever a new user connects it will connect to him through the peerId
          socket.on('user-connected', (userId: string, otherPeerId: string) => {
            connectToNewUser(userId, otherPeerId, stream);
          });
          // when the peer make a call
          peer.on('call', (call) => {
            call.answer(stream);
            // const video = document.createElement('video');
            call.on('stream', (otherUserStream) => {
              // it gets called two times for each type of track audio and video
              console.log('other stream', otherUserStream);
              // add other user video to dom
              addSecondVideoStream(otherUserStream)
            });
            call.on('close', () => {
              // disconnect the peer and get rid of the stream
              peer.disconnect();
              (otherVideoRef.current! as any).video.srcObject = null;
              // this sets the hadOtherJoined to false
              setHasOtherJoined(false);
              console.log(hasOtherJoined);
            });
          });
        });
    });
  }, []);

  return (
    <div className="App">
      {/* <a href="http://localhost:4000" target="_blank">
        click here
      </a>
      <Webcam ref={myVideoRef} />
      {hasOtherJoined && <Webcam ref={otherVideoRef} />} */}

      <BrowserRouter>
        <Routes />

      </BrowserRouter>
    </div>
  );
}
export default App;