import { io } from "socket.io-client";

const socket = io('https://api-foursome.herokuapp.com/');

export {socket}