import { useEffect, useState } from "react";
import ChatSide from "../components/ChatSide";
import VideoComponent from "../components/VideoComponent";
import { FaRegCommentDots } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
function VideoChat({ socket }) {
  const [side, setside] = useState(true);
    const [height, setheight] = useState(true);
  useEffect(() => {
    if (visualViewport.width <= 768) {
      setside(false);
    }
  }, []);

  return (
    <div className=" flex">
      <div className=" md:w-[35em] grid justify-center lg:w-[30em]  border-r-2 min-h-screen pr-4 border-black">
        <VideoComponent socket={socket} />
      </div>
      <div
        style={{
          clipPath: side
            ? "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            height:`${height}`
        }}
        className="fixed md:relative md:flex z-40 right-0 top-0  overflow-y-scroll  w-[80%] bg-black "
      >
        <ChatSide socket={socket} />
      </div>

      {side ? (
        <GiCrossMark
          className="md:hidden  top-[50vh]   z-[20] text-4xl fixed bg-white text-red-500 rounded-full left-2 px-2 py-2 scale-150"
          onClick={() => {
            setside((prev) => !prev);
          }}
        />
      ) : (
        <FaRegCommentDots
          className=" md:hidden top-[50vh]   z-[20] text-4xl fixed bg-white text-black right-2 rounded-full px-2 py-2 scale-150"
          onClick={() => {
            setside((prev) => !prev);
          }}
        />
      )}
    </div>
  );
}

export default VideoChat;
