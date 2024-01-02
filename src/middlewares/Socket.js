import { io } from "socket.io-client";
export const socket = io("https://cyphlo.onrender.com/chat");
export const videoSocket = io("https://cyphlo.onrender.com/video");
//local https://192.168.1.152:3000
