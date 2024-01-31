import { io } from "socket.io-client";
export const socket = io("https://10.200.78.55:3000/chat");
export const videoSocket = io("https://10.200.78.55:3000/video");
//local https://10.200.78.55:3000
