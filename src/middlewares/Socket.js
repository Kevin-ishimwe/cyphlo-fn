import { io } from "socket.io-client";
export const socket = io("https://192.168.1.152:3000/chat");
export const videoSocket = io("https://192.168.1.152:3000/video");
//local https://192.168.1.152:3000
