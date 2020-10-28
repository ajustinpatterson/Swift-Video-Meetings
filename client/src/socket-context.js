import io from 'socket.io-client';
import React from 'react';

export const socket = io('ws://localhost:3002/', {transports: ["websocket"]}); //connects to server

export const SocketContext = React.createContext(
  socket
);


