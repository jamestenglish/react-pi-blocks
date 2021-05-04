import React from 'react';

import socketio from 'socket.io-client';
const ENDPOINT = 'http://localhost:8080';
const socket = socketio.connect(ENDPOINT, { reconnect: true });
const SocketContext = React.createContext();

export { socket, SocketContext };
