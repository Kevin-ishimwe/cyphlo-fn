import ChatSide from "../components/ChatSide";
import CamStream from "../components/camera";
function VideoChat({ socket }) {
  return (
    <div className=" flex">
      <div className="w-[35%] border-r-2 min-h-screen pr-4 border-black">
        <CamStream id="4vid" className="" />
        <CamStream id="4vid" className="" />
      </div>
      <div className="w-[80%] overflow-y-scroll h-[100vh] ">
        <ChatSide className="resize-x" socket={socket} />
      </div>
    </div>
  );
}

export default VideoChat;
