import React from 'react';
import socketio from 'socket.io-client';

const ENDPOINT = `${window.location.hostname}:8080`;
const socket = socketio.connect(ENDPOINT, { reconnect: true });
const SocketContext = React.createContext();

export { socket, SocketContext };
