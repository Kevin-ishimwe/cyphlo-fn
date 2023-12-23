import ChatSide from "../components/ChatSide";
import VideoComponent from "../components/VideoComponent";
function VideoChat({ socket }) {
  //console.log(socket.nsp,socket.connected);

  return (
    <div className=" flex">
      <div className="w-[35%] border-r-2 min-h-screen pr-4 border-black">
        <VideoComponent socket={socket} />
      </div>
      <div className="w-[80%] overflow-y-scroll h-[100vh] ">
        <ChatSide className="resize-x" socket={socket} />
      </div>
    </div>
  );
}

export default VideoChat;
