import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Meeting.scss';
import Peer from 'peerjs';
import Webcam from 'react-webcam';
import { WebcamComponent } from '../../components/Webcam/Webcam';
import { SocketContext } from '../../socket-context';
import logo from '../../assets/swift-logo-middle.png';
import userSettings from '../../components/UserSettings/UserSettings';

// import {uuid} from '../../uuid';
interface props {
  socket: any;
}
const Meeting = () => {
  //****************** VARIABLES ************************/
  const myVideoRef = useRef(null);
  const history = useHistory();
  const socket = useContext(SocketContext);
  const otherVideoRef = useRef(null);
  const [hasOtherJoined, setHasOtherJoined] = useState<boolean>(false);
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const [sharing, setSharing] = useState<boolean>(false);
  const [videoToggle, setVideoToggle] = useState<boolean>(true);
  const [recording, setRecording] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);

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
        max: 1920,
      },
      height: {
        min: 480,
        ideal: 720,
        max: 1080,
      },
    },
  };
  const gdmOptions = {
    video: {
      cursor: 'never',
      // width: 100,
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
    },
  };

  //****************** FUNCTIONS DECLARATION ************************/
  function handleProfile() {
    history.push('/userprofile');
  }

  function connectToNewUser(
    userId: string,
    otherPeerId: string,
    stream: MediaStream,
    peer: any,
  ) {
    peer.connect(otherPeerId);
    const mediaConnection = peer.call(otherPeerId, stream);
    mediaConnection.on('stream', (otherUserStream: any) => {
      addSecondVideoStream(otherUserStream);
    });
  }
  function addSecondVideoStream(stream: MediaStream) {
    setStreams([...streams, stream]);
    setHasOtherJoined(true);

    // ...
  }
  // VIDEO ON/OFF
  function displayMyStream(stream: MediaStream) {
    setVideoToggle(true);
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      (myVideoRef.current! as any).video.srcObject = stream;
    });
  }
  function handleVideoToggle() {
    setVideoToggle(!videoToggle);
    videoToggle
      ? ((myVideoRef.current! as any).video.srcObject = null)
      : navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          (myVideoRef.current! as any).video.srcObject = stream;
        });
    // display picture
  }
  function stopDisplayMyStream(stream: MediaStream) {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      (myVideoRef.current! as any).video.srcObject = null;
    });
    setVideoToggle(false);
  }
  // SCREEN SHARING
  async function screenSharing(options: object) {
    let captureStream = null;
    try {
      const mediaDevices = navigator.mediaDevices as any;
      captureStream = await mediaDevices.getDisplayMedia(gdmOptions);
      (myVideoRef.current! as any).video.srcObject = captureStream;
      setSharing(true);
      captureStream.getVideoTracks()[0].onended = function () {
        stopScreenSharing();
      };
    } catch (err) {
      console.error('Error: ' + err);
    }
    return captureStream;
  }
  function stopScreenSharing() {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      setSharing(false);
      // (myVideoRef.current! as any).video.srcObject = stream;
      // stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled
      displayMyStream(stream);
    });
  }

  // SCREEN RECORDING
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
  //     })
  // }
  // function handleDataAvailable(event: any) {
  //   if (event.data.size > 0) {
  //     chunks.push(event.data);
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
  function muteUnmute(mute: boolean) {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        const isEnabled = stream.getAudioTracks()[0].enabled;
        if (!mute) {
          setMute(true);
          stream.getAudioTracks()[0].enabled = false;
        } else {
          setMute(false);
          stream.getAudioTracks()[0].enabled = true;
        }
      });
  }

  //****************** USE EFFECT ************************/
  useEffect(() => {
    socket.on('connect', () => {
      navigator.mediaDevices
        .getUserMedia(
          // constraints
          { video: true, audio: true },
        )
        .then((stream) => {
          let peer = new Peer(undefined, {
            host: 'peerjs-server.herokuapp.com',
            secure: true,
            port: 443,
          });
          peer.on('error', (err) => {
            console.log('error peer connection', err);
          });
          peer.on('open', (peerId) => {
            socket.emit('join-room', 12345, socket.id, peerId);
          });
          peer.on('connection', (conn) => {
            conn.on('data', (data) => {
              console.log('this is the data from other peer: ', data);
            });
          });
          socket.on('user-connected', (userId: string, otherPeerId: string) => {
            connectToNewUser(userId, otherPeerId, stream, peer);
          });
          peer.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (otherUserStream) => {
              addSecondVideoStream(otherUserStream);
            });
            call.on('close', () => {
              peer.disconnect();
              (otherVideoRef.current! as any).video.srcObject = null;
              setHasOtherJoined(false);
            });
          });
        })
        .catch((error) => {
          console.error(error.name, error.message);
        });
    });
  }, [streams]);

  //****************** RENDERING ************************/

  return (
    <>
      <div className="bird-container">
        <img src={logo} className="bird-middle" />
      </div>

      <div className="container">
        <Webcam ref={myVideoRef} />
        {console.log('My video Ref ////////////////', myVideoRef)}
        {streams.map((stream) => (
          <WebcamComponent videoRef={stream} />
        ))}
      </div>
      <div className="cntrlbar">
        <button
          className={!sharing ? 'share-off' : 'share-on'}
          onClick={screenSharing}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#6B6B6D"
              d="M19,2H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H7.64l-.58,1a2,2,0,0,0,0,2,2,2,0,0,0,1.75,1h6.46A2,2,0,0,0,17,21a2,2,0,0,0,0-2l-.59-1H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM8.77,20,10,18H14l1.2,2ZM20,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V14H20Zm0-3H4V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"
            />
          </svg>
        </button>

        <button
          className={videoToggle ? 'btn-off' : 'btn-on'}
          onClick={handleVideoToggle}
        >
          {videoToggle ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#6B6B6D"
                d="M21.53,7.15a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,3-2.89l3.56,1.78A1,1,0,0,0,21,17a1,1,0,0,0,.53-.15A1,1,0,0,0,22,16V8A1,1,0,0,0,21.53,7.15ZM15,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h9a1,1,0,0,1,1,1Zm5-.62-3-1.5V11.12l3-1.5Z"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#6B6B6D"
                d="M7.71,6.29h0l-4-4A1,1,0,0,0,2.29,3.71L4.62,6A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,1.9-.69l4.39,4.4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM14,16H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H6.59l7.87,7.88A1,1,0,0,1,14,16Zm7.53-8.85a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H12.66a1,1,0,0,0,0,2H14a1,1,0,0,1,1,1v1.5h0a1.62,1.62,0,0,0,0,.19.65.65,0,0,0,.05.2h0s.05.06.07.1a1,1,0,0,0,.15.21s.1.06.15.1l.17.11a.85.85,0,0,0,.23,0,.7.7,0,0,0,.14,0h0a1.62,1.62,0,0,0,.19,0,.65.65,0,0,0,.2-.05h0L20,9.62v5.72a1,1,0,1,0,2,0V8A1,1,0,0,0,21.53,7.15Z"
              />
            </svg>
          )}
        </button>

        <button
          className={mute ? 'btn-off' : 'btn-on'}
          onClick={() => muteUnmute(mute)}
        >
          {mute ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#6B6B6D"
                d="M10.5,3.73a2,2,0,0,1,2.95-.14A2,2,0,0,1,14,5V8.41a1,1,0,0,0,2,0V5A4,4,0,0,0,9,2.47,1,1,0,1,0,10.5,3.73Zm8.22,9.54.2,0a1,1,0,0,0,1-.81A7.91,7.91,0,0,0,20,11a1,1,0,0,0-2,0,5.54,5.54,0,0,1-.11,1.1A1,1,0,0,0,18.72,13.27Zm3,6.06-18-18a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L8,8.48V11a4,4,0,0,0,6,3.46l1.46,1.46A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8,8,0,0,0,7,7.93V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93a7.87,7.87,0,0,0,3.85-1.59l3.4,3.4a1,1,0,0,0,1.42-1.41ZM12,13a2,2,0,0,1-2-2v-.52l2.45,2.46A1.74,1.74,0,0,1,12,13Z"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#6B6B6D"
                d="M12,15a4,4,0,0,0,4-4V5A4,4,0,0,0,8,5v6A4,4,0,0,0,12,15ZM10,5a2,2,0,0,1,4,0v6a2,2,0,0,1-4,0Zm10,6a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8,8,0,0,0,7,7.93V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93A8,8,0,0,0,20,11Z"
              />
            </svg>
          )}
        </button>

        <button className="btn-off" onClick={handleProfile}>
          <i className="far fa-user set"></i>
        </button>
      </div>
    </>
  );
};

{
  /* // return (
//   <div className="mtngcontainer">
//     <div className="others-video-container">
//       { */
}
{
  /* //         streams.map((stream) => <WebcamComponent videoRef={stream} key={stream.id} />)
//       }
//     </div> */
}
{
  /*
//     <div className="my-video-container">
//       <Webcam ref={myVideoRef} />
//     </div>

//     <div className="cntrlbar">
//       <div className="container">
//       </div>
//       <button className={!sharing ? 'share-off' : 'share-on'} onClick={screenSharing}>
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#6B6B6D" d="M19,2H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H7.64l-.58,1a2,2,0,0,0,0,2,2,2,0,0,0,1.75,1h6.46A2,2,0,0,0,17,21a2,2,0,0,0,0-2l-.59-1H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM8.77,20,10,18H14l1.2,2ZM20,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V14H20Zm0-3H4V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"/></svg>
//       </button>

//       <button className={videoToggle ? 'btn-off' : 'btn-on'} onClick={handleVideoToggle}>{videoToggle ?
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#6B6B6D" d="M21.53,7.15a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,3-2.89l3.56,1.78A1,1,0,0,0,21,17a1,1,0,0,0,.53-.15A1,1,0,0,0,22,16V8A1,1,0,0,0,21.53,7.15ZM15,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h9a1,1,0,0,1,1,1Zm5-.62-3-1.5V11.12l3-1.5Z"/></svg>
//         : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#6B6B6D" d="M7.71,6.29h0l-4-4A1,1,0,0,0,2.29,3.71L4.62,6A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,1.9-.69l4.39,4.4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM14,16H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H6.59l7.87,7.88A1,1,0,0,1,14,16Zm7.53-8.85a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H12.66a1,1,0,0,0,0,2H14a1,1,0,0,1,1,1v1.5h0a1.62,1.62,0,0,0,0,.19.65.65,0,0,0,.05.2h0s.05.06.07.1a1,1,0,0,0,.15.21s.1.06.15.1l.17.11a.85.85,0,0,0,.23,0,.7.7,0,0,0,.14,0h0a1.62,1.62,0,0,0,.19,0,.65.65,0,0,0,.2-.05h0L20,9.62v5.72a1,1,0,1,0,2,0V8A1,1,0,0,0,21.53,7.15Z"/></svg>}

//        </button>

//       <button className={mute ? 'btn-off' : 'btn-on'} onClick={() => muteUnmute(mute)}>{mute ?
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#6B6B6D" d="M10.5,3.73a2,2,0,0,1,2.95-.14A2,2,0,0,1,14,5V8.41a1,1,0,0,0,2,0V5A4,4,0,0,0,9,2.47,1,1,0,1,0,10.5,3.73Zm8.22,9.54.2,0a1,1,0,0,0,1-.81A7.91,7.91,0,0,0,20,11a1,1,0,0,0-2,0,5.54,5.54,0,0,1-.11,1.1A1,1,0,0,0,18.72,13.27Zm3,6.06-18-18a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L8,8.48V11a4,4,0,0,0,6,3.46l1.46,1.46A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8,8,0,0,0,7,7.93V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93a7.87,7.87,0,0,0,3.85-1.59l3.4,3.4a1,1,0,0,0,1.42-1.41ZM12,13a2,2,0,0,1-2-2v-.52l2.45,2.46A1.74,1.74,0,0,1,12,13Z"/></svg>
//         : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#6B6B6D" d="M12,15a4,4,0,0,0,4-4V5A4,4,0,0,0,8,5v6A4,4,0,0,0,12,15ZM10,5a2,2,0,0,1,4,0v6a2,2,0,0,1-4,0Zm10,6a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8,8,0,0,0,7,7.93V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93A8,8,0,0,0,20,11Z"/></svg>}
//         </button>
//     </div>
//   </div>
// );
// }; */
}

export default Meeting;
