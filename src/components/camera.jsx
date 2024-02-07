import { useEffect, useState } from "react";
import rand_chat from "../assets/rx_chat.png";
import Logo from "./logo";
function MirrorStream() {
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
    <div className="flex items-center  mt-5 mx-2 md:mr-1 ">
      {videostream ? (
        <div className="relative">
          <video
            className="w-[100%] rounded-2xl  object-cover max-h-[50vh] md:max-h-full"
            autoPlay
            playsInline
            muted
            ref={(video) => video && (video.srcObject = videostream)}
          />
          <div className="absolute right-2 bottom-0">
            <Logo />
          </div>
        </div>
      ) : (
        <img src={rand_chat}></img>
      )}
    </div>
  );
}

export default MirrorStream;
