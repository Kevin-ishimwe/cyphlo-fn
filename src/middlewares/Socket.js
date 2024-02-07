import { io } from "socket.io-client";
export const socket = io("https://10.200.129.254:3000/chat");
export const videoSocket = io("https://10.200.129.254:3000/video");
//local https://10.200.129.254:3000
