import { useEffect, useState, useRef } from "react";

import Peer from "simple-peer";

import Logo from "./logo";

function VideoComponent({ socket }) {
  const vidSelf = useRef();
  const [remotestream, setremotestream] = useState(null);
  const handleVideoFeed = (stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
        ],
      },
      stream: stream,
    });
    const guestPeer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("video:signal", {
        signal,
        room: localStorage.getItem("video_room_id"),
      });
    });

    socket.on("video:signal", (data) => {
      guestPeer.signal(data.signal);
    });

    guestPeer.on("signal", (signal) => {
      socket.emit("video:signal return", {
        signal,
        room: localStorage.getItem("video_room_id"),
      });
    });
    socket.on("video:signal return", (data) => {
      peer.signal(data.signal);
    });
    peer.on("stream", (stream) => {
      setremotestream(stream);
      //guestSelf.current.srcObject = stream;
    });
    guestPeer.on("stream", (stream) => {
      setremotestream(stream);
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
            localStorage.setItem("video_user_id", socket.id);
            localStorage.setItem("video_room_id", data.room);
          });
          handleVideoFeed(stream);
        });
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  useEffect(() => {
    try {
      initCamera();
    } catch (error) {
      console.log(error);
    }
  }, []);
    window.onresize = () => {
      console.log(
        "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
      setheight(visualViewport.height);
    };

  return (
    <div>
      <div className="grid items-center  mt-2 mr-1">
        <div className="relative">
          <video
            className="w-[100%] h-[50vh] md:h-full  object-cover md:object-contain rounded-2xl mx-2"
            autoPlay
            playsInline
            muted
            ref={vidSelf}
          />
          <div className="absolute left-4 bottom-0 md:scale-[.85]">
            <Logo />
          </div>
        </div>
        <div className="relative mt-1">
          {remotestream == null ? (
            <div className="flex justify-center ">
              <h1 className="text-2xl grad1 mt-[6em] animate-pulse">
                finding partner...
              </h1>
              <div className="h-[20em] w-[20em] border-[.5em] border-blue-500 rounded-full border-t-[0px] border-b-[0px] animate-spin  absolute "></div>
              <div className="h-[20em] w-[20em] border-[.5em] border-red-600 rounded-full border-r-[0px] border-l-[0px] animate-spin absolute"></div>
            </div>
          ) : (
            <div>
              <video
                className="w-[100%] rounded-2xl mx-2"
                autoPlay
                playsInline
                muted
                ref={(video) => video && (video.srcObject = remotestream)}
              />
              <div className="absolute left-0 bottom-[-1em] md:scale-[.85]">
                <Logo />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoComponent;
