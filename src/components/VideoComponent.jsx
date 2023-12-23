import { useEffect, useState, useRef } from "react";
import SimplePeer from "simple-peer";
import Peer from "simple-peer";
import rand_chat from "../assets/rx_chat.png";
import Logo from "./logo";

const peerManagement = () => {};

function VideoComponent({ socket }) {
  const [peers, setPeers] = useState([]);
  const vidSelf = useRef();
  const guestSelf = useRef();

  const handlePeer = (stream) => {
    const residentPeer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    const guestPeer = new Peer();
    residentPeer.on("signal", (data) => {
      guestPeer.signal(data);
    });
    guestPeer.on("signal", (data) => {
      residentPeer.signal(data);
    });

    guestPeer.on("stream", (stream) => {
      console.log(stream);
      guestSelf.current.srcObject = stream;
    });
  };
  const initCamera = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          vidSelf.current.srcObject = stream;
          socket.emit("video:join", {
            name: JSON.parse(localStorage.getItem("nickname")),
          });
          socket.on("video:join", (data) => {
            // console.log(data);
            localStorage.setItem("video_user_id", data.id);
            localStorage.setItem("video_room_id", data.room);
          });
          handlePeer(stream);
        });
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  useEffect(() => {
    initCamera();
  }, []);

  return (
    <div>
      <div className="grid items-center  mt-2 mr-1">
        <div className="relative">
          <video
            className="w-[100%] rounded-2xl mx-2"
            autoPlay
            playsInline
            muted
            ref={vidSelf}
          />
          <div className="absolute -right-2 bottom-[-1em] scale-[.8]">
            <Logo />
          </div>
        </div>
        <div className="relative mt-1">
          <video
            className="w-[100%] rounded-2xl mx-2"
            autoPlay
            playsInline
            muted
            ref={guestSelf}
          />
          <div className="absolute left-0 bottom-[-1em] scale-[.85]">
            <Logo />
          </div>
        </div>
        {/* <img src={rand_chat}></img> */}
      </div>
    </div>
  );
}

export default VideoComponent;
