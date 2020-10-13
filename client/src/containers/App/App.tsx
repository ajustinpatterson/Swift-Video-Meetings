import React, {useState, useEffect} from 'react';
import Landing from '../../components/Landing/Landing';
import Meeting from '../../components/Meeting/Meeting';
import './App.css';

interface props {
  socket:any
}



function App({socket}:props) {
  const connectToNewUser = (userId:string) => {
    
  }

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join-room', 12345, socket.id)
      socket.on('user-connected', (userId:string) => {
        console.log(userId)
        connectToNewUser(userId)
      })
    })
  }, [])

  socket.on('test', (data:any) => {
    console.log(data)
  })

  return (
    <div className="App">
      {console.log(socket)}
      <a href='http://localhost:3002' target='_blank'>
        click here
      </a>
      <Meeting />
    </div>
  );
}

export default App;
