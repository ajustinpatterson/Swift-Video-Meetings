import io from 'socket.io-client';
import React from 'react';

export const socket = io('http://localhost:3002/');

export const SocketContext = React.createContext(
  socket
);


