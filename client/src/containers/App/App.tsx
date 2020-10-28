import Peer from 'peerjs';
import Webcam from 'react-webcam';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { WebcamComponent } from '../../components/Webcam/Webcam';
// import {uuid} from '../../uuid';
interface props {
  socket: any;
}
// console.log('uuid: ', uuid);
function App({ socket }: props) {
  // create the peerobject with no id which will be automaticaly assigned (uuid) on the open evennt
  //****************** VARIABLES ************************/
  const myVideoRef = useRef(null);
  const otherVideoRef = useRef(null);
  const [hasOtherJoined, setHasOtherJoined] = useState(false);
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const [sharing, setSharing] = useState(false);
  const [videoToggle, setVideoToggle] = useState(false);
  const [recording, setRecording] = useState(false);
  // const MediaRecorder: any = null;
  const mediaDevices = navigator.mediaDevices as any;
  let chunks: any[] = [];
  const constraints = {
    audio: true,
    video: {
      // user, {exact: 'user'}, environment
      facingMode: 'user',
      width: {
        min: 640,
        ideal: 1280,
        max: 1920
      },
      height: {
        min: 480,
        ideal: 720,
        max: 1080
      }
    }
  }
  const gdmOptions = {
    video: {
      cursor: "never",
      // width: 100,
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100
    }
  }
  //****************** FUNCTIONS DECLARATION ************************/
  function connectToNewUser(userId: string, otherPeerId: string, stream: MediaStream, peer: any) {
    console.log('Other user peerId ->', otherPeerId);
    peer.connect(otherPeerId);
    // call is emitted when a remote peer attempts to call you.
    const mediaConnection = peer.call(otherPeerId, stream);
    mediaConnection.on('stream', (otherUserStream: any) => {
      // it gets called two times for each type of track audio and video
      // console.log('other stream', otherUserStream);
      addSecondVideoStream(otherUserStream)
    })
  };
  function addSecondVideoStream(stream: MediaStream) {
    setHasOtherJoined(true);
    setStreams([...streams, stream]);
    // ...
  };
  // VIDEO ON/OFF
  function displayMyStream(stream: MediaStream) {
    setVideoToggle(true);
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        (myVideoRef.current! as any).video.srcObject = stream;
      })
  }
  function handleVideoToggle() {
    setVideoToggle(!videoToggle);
    videoToggle
      ? (myVideoRef.current! as any).video.srcObject = null
      : navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          (myVideoRef.current! as any).video.srcObject = stream;
        })
    // display picture
  }
  function stopDisplayMyStream(stream: MediaStream) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        (myVideoRef.current! as any).video.srcObject = null;
      });
    setVideoToggle(false);
  }
  // SCREEN SHARING
  function stopScreenSharing() {
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        // (myVideoRef.current! as any).video.srcObject = stream;
        // stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled
        displayMyStream(stream);
        console.log(stream.getVideoTracks())
      })
  }
  async function screenSharing(options: object) {
    let captureStream = null;
    try {
      console.log('options', options)
      const mediaDevices = navigator.mediaDevices as any;
      captureStream = await mediaDevices.getDisplayMedia(gdmOptions);
      (myVideoRef.current! as any).video.srcObject = captureStream;
      console.log('captureStream', captureStream)
      console.log('get video tracks', captureStream.getVideoTracks())
      captureStream.getVideoTracks()[0].onended = function () {
        stopScreenSharing()
      }
    } catch (err) {
      console.error("Error: " + err);
    }
    return captureStream;
  }
  // // RECORD VIDEO/AUDIO ON/OFF
  // function handleRecording() {
  //   setVideoToggle(!videoToggle);
  //   videoToggle
  //     ? startRecording()
  //     : stopRecordingAndDownload()
  //   // display picture
  // }
  // function startRecording() {
  //   navigator.mediaDevices.getUserMedia(constraints)
  //     .then((stream) => {
  //       const options = { mimeType: "video/webm; codecs=vp9" };
  //       const mediaRecorder = new MediaRecorder(stream, options);
  //       mediaRecorder.ondataavailable = handleDataAvailable;
  //       mediaRecorder.start();
  //       console.log('mediaRecorder.state', mediaRecorder.state)
  //     })
  // }
  // function handleDataAvailable(event: any) {
  //   console.log(event)
  //   if (event.data.size > 0) {
  //     chunks.push(event.data);
  //     console.log(chunks);
  //     download();
  //   }
  // }
  // function download() {
  //   const blob = new Blob(chunks, {
  //     type: "video/webm"
  //   });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   document.body.appendChild(a);
  //   // a.style = "display: none";
  //   a.href = url;
  //   a.download = "test.webm";
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }
  // function stopRecordingAndDownload() {
  //   navigator.mediaDevices.getUserMedia(constraints)
  //     .then((stream) => {
  //       mediaRecorder.stop();
  //     })
  // }
  function handleRecord(stream: any) {
    setRecording(true);
  }
  function handleStop(stream: any) {
    setRecording(false);
    screenSharing(stream);
  }
  // AUDIO ON/OFF
  function handleAudio(stream: any) {
    console.log(stream.getAudioTracks())
    const isEnabled = stream.getAudioTracks()[0].enabled
    if (isEnabled) {
      stream.getAudioTracks()[0].enabled = false
    } else {
      stream.getAudioTracks()[0].enabled = true
    }
  }
  //****************** USE EFFECT ************************/
  useEffect(() => {
    socket.on('connect', () => {
      navigator.mediaDevices
        .getUserMedia(
          constraints
          // {video: true,
          // audio: true}
        )
        .then((stream) => {
          console.log('recordingr', recording)
          // console.log(stream.getAudioTracks())
          // if ('srcObject' in myVideoRef) {
          //   (myVideoRef.current! as any).video.srcObject = stream;
          // } else {
          //   (myVideoRef.current! as any).video.src = window.URL.createObjectURL(stream);
          // }
          displayMyStream(stream);
          console.log('constraints: ', constraints);
          const peer = new Peer(undefined, {
            host: 'swift-peer-server.herokuapp.com',
            port: 80
          });
          console.log('peer', peer);
          console.log('my stream getAudotracks', stream.getAudioTracks())
          console.log('my stream getTrackById', stream.getTrackById('65d7ee52-b0cc-405f-8b83-a6ae30661a8d'))
          console.log('my stream getTracks', stream.getTracks())
          console.log('my stream getVideoTracks', stream.getVideoTracks())
          // set peer listeners
          peer.on('error', (err) => {
            console.log('error peer connection', err);
          });
          peer.on('open', (peerId) => {
            console.log('My peerId ->', peerId);
            socket.emit('join-room', 12345, socket.id, peerId);
          });
          // Emitted when a new data connection is established from a remote peer.
          peer.on('connection', (conn) => {
            console.log('*****************************an user just connected', stream);
            conn.on('data', (data) => {
              console.log('this is the data from other peer: ', data);
            })
          });
          // open is emitted when a new data connection is established from a remote peer.
          // the peerID is automatically generated here with the uuid lib
          // whenever a new user connects it will connect to him through the peerId
          socket.on('user-connected', (userId: string, otherPeerId: string) => {
            connectToNewUser(userId, otherPeerId, stream, peer);
          });
          // when the peer make a call
          peer.on('call', (call) => {
            console.log('peer.on call is triggered')
            call.answer(stream);
            // const video = document.createElement('video');
            call.on('stream', (otherUserStream) => {
              // it gets called two times for each type of track audio and video
              // console.log('other stream', otherUserStream);
              // add other user video to dom
              addSecondVideoStream(otherUserStream)
            });
            call.on('close', () => {
              console.log('peer.on CLOSE is triggered')
              // disconnect the peer and get rid of the stream
              peer.disconnect();
              (otherVideoRef.current! as any).video.srcObject = null;
              // this sets the hadOtherJoined to false
              setHasOtherJoined(false);
              console.log(hasOtherJoined);
            });
          });
        })
        .catch(error => {
          console.error(error.name, error.message);
        })
        ;
    });
  }, []);
  return (
    <div className="App">
      {console.log(socket)}
      <div className="container">
        <Webcam ref={myVideoRef} />
        {console.log('othervideo REF ////////////////', otherVideoRef)}
        {
          streams.map((stream) => <WebcamComponent videoRef={stream} />)
        }
      </div>
      <button className="btn btn-primary btn-sm de" onClick={screenSharing}>Share Screen</button>
      {/* <button className="btn btn-primary btn-sm de" >Video ON</button> */}
      <button className="btn btn-primary btn-sm de" >Audio</button>
      {/* <button className="btn btn-primary btn-sm de" onClick={handleStart}>Start rec</button> */}
      <video src=""></video>
      {/* <button className="btn btn-primary btn-sm de" onClick={handleShare}>Share Screen</button>
      <button className="btn btn-primary btn-sm de" onClick={handleShare}>Share Screen</button> */}
      <button className="btn btn-primary btn-sm de" onClick={handleVideoToggle}>{videoToggle ? 'Stop video' : 'Start video'}</button>
      {/* <button className="btn btn-primary btn-sm de" onClick={handleRecording}>{recording ? 'Stop Recording' : 'Start Recording'}</button> */}
      {/* <a href="http://localhost:4000" target="_blank">
        click here
      </a> */}
      {/* this is temporary! */}
      {/* <button onClick={handleShare}>Share</button> */}
    </div>
  );
}
export default App;