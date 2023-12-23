import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { socket, videoSocket } from "./middlewares/Socket";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import VideoChat from "./pages/Video";
function App() {
  localStorage.setItem("video_socket_id", videoSocket.id);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/chat" element={<Chat socket={socket} />}></Route>
        <Route
          path="/videochat"
          element={<VideoChat socket={videoSocket} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
