import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { socket } from "./middlewares/Socket";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import VideoChat from "./pages/Video";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/chat" element={<Chat socket={socket} />}></Route>
        <Route
          path="/videochat"
          element={<VideoChat socket={socket} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
