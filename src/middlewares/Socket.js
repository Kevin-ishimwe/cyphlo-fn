import { io } from "socket.io-client";
export const socket = io(
  "https://ec2-18-119-14-44.us-east-2.compute.amazonaws.com:3000/chat"
);
export const videoSocket = io(
  "https://ec2-18-119-14-44.us-east-2.compute.amazonaws.com:3000/video"
);
//local https://192.168.1.152:3000
