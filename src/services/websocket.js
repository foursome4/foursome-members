import { io } from "socket.io-client";

//const socket = io('https://api-foursome.herokuapp.com/');
const socket = io('http://localhost:3333');

export {socket}