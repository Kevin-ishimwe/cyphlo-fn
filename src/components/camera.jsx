import { useEffect, useState } from "react";
import rand_chat from "../assets/rx_chat.png";
function CamStream() {
  const [videostream, setvideostream] = useState(null);
  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setvideostream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  useEffect(() => {
    initCamera();
    return () => {
      videostream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="flex items-center  mt-5">
      {videostream ? (
        <video
          className="w-[100%] rounded-2xl "
          autoPlay
          playsInline
          muted
          ref={(video) => video && (video.srcObject = videostream)}
        ></video>
      ) : (
        <img src={rand_chat}></img>
      )}
    </div>
  );
}

export default CamStream;
