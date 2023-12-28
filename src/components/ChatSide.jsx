import { useState, useEffect } from "react";
import { MdOutlineAttachment } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { IoRefresh } from "react-icons/io5";
import { NavLink } from "react-router-dom";
function ChatSide({ socket }) {
  const [message, setmessage] = useState("");
  const [users, setusers] = useState([]);
  const [my_id, setmy_id] = useState(null);
  const [typing, settyping] = useState(false);
  const [height, setheight] = useState(true);

  const getMessages = (socket) => {
    socket.on("video:chat", (data) => {
      setusers((prev) => [...prev, data]);
    });
  };
  useEffect(() => {
    try {
      getMessages(socket);
      socket.on("video:typing", (typing) => {
        settyping(typing);
      });
    } catch (e) {
      console.log(e.message);
    }
    setmy_id(socket.id);
  }, []);
  window.onresize = () => {
    console.log(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    setheight(visualViewport.height);
  };
  return (
    <div className="w-full bg-[#f6f6f6] h-[100%]">
      <div className="bg-white w-full h-[4em] flex items-center md:px-5 justify-between shadow-[2px_2px_400px_#a8a8a8] fixed top-0">
        <div className="flex items-center">
          <img
            src="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
            alt=""
            className="h-5 mx-1"
          />
          <h1 className="font-['Oswald']">user@1291</h1>
          <NavLink to={"/"} className={"md:ml-2 font-bold"}>
            \home
          </NavLink>
        </div>
        <div className=" flex">
          {/* <Buttongrad
            text=" random video"
            icon={<FaVideo className="text-3xl mr-2" />}
            bg="black"
          /> */}
          <button className="flex items-center font-bold rounded-full relative pl-10 px-6 py-2 bg-red-500 text-white hover:scale-105 transition-all ">
            <IoRefresh className="text-xl font-bold absolute left-4" />
            new user
          </button>
        </div>
      </div>

      <div className="mt-5 pb-[4em] py-1">
        {users.map((item) => {
          return (
            <div
              style={{ justifyContent: item.user == my_id ? "end" : "start" }}
              className={`w-full  flex `}
            >
              <p
                style={{
                  background: item.user == my_id ? "#6262f2" : "#65db65",
                }}
                className={`max-w-[60%] min-w-[20vw] px-2 mt-2 py-2 mx-1 rounded-sm font-['Oswald'] font-light text-white text-lg`}
              >
                {item.messages}
              </p>
            </div>
          );
        })}

        {typing.state && typing.data.id != socket.id ? (
          <div className="mt-5 w-full  py-2 ">
            <p className="flex items-center  bg-[#65db65] w-fit text-3xl px-2 mt-2 py-4 mx-1 rounded-sm font-['Oswald'] font-light text-white">
              <span className="typing h-1 w-1 bg-white mx-1 rounded-full"></span>
              <span className="typing1 h-1 w-1 bg-white mx-1 rounded-full"></span>
              <span className="typing2 h-1 w-1 bg-white mx-1 rounded-full animate"></span>
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div
        className="fixed w-[80%] md:w-[55%] lg:w-[70%] bottom-1 right-0 pl-[2%]"
      >
        <div className="flex absolute  right-2 mt-1 ">
          <MdOutlineAttachment className="text-3xl mx-3" />
          <IoMdSend
            className="text-3xl"
            onClick={() => {
              socket.emit("chat", {
                user: socket.id,
                messages: message,
              });
            }}
          />
        </div>
        <input
          type="text"
          className="  w-full py-2  px-3 border-2 rounded-full  border-black focus:outline-none font-['Oswald']"
          placeholder="Enter message"
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              const message = e.target.value;
              setusers((prev) => [...prev, { user: my_id, messages: message }]);
              socket.emit("video:chat", {
                user: socket.id,
                messages: message,
                room: localStorage.getItem("video_room_id"),
              });
              socket.emit("video:typing", {
                id: socket.id,
                state: "off",
                room: localStorage.getItem("video_room_id"),
              });
              e.target.value = "";
            }
          }}
          onFocus={async (e) => {
            console.log("FOCUS");
            socket.emit("video:typing", {
              id: socket.id,
              state: "on",
              room: localStorage.getItem("video_room_id"),
            });
          }}
          onBlur={() => {
            socket.emit("video:typing", {
              id: socket.id,
              state: "off",
              room: localStorage.getItem("video_room_id"),
            });
          }}
        />
      </div>
    </div>
  );
}

export default ChatSide;
