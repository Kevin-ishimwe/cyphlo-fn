import { io } from "socket.io-client";
export const socket = io("http://localhost:3000/chat");
export const videoSocket = io("http://localhost:3000/video");